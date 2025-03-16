import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import styles from './map.module.css'
// import countIndustries from './tools/map_processing/countIndustries';
// import convertToHex from './tools/map_processing/convertToHex';
import MapController from './MapController';
// import MapSettingsDisplay from './components/MapSettings/MapSettingsDisplay';
// import MenuController from './components/Menu/MenuController';
import MenuController, { Windows, WindowState } from './components/Menu/MenuController';
// import ActionController from './components/ActionMenu/ActionMenuController';
import ActionController from './components/ActionMenu/ActionMenuController';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from './tools/serverConn';
import type { GETCurrentCompanyResponse } from '@dbtypes/api/schema/apiCompany';
import NotificationsPanel from './components/Notifications/NotificationsPanel';
import type { GETAllSaveResponse, GETOneSaveResponse } from '@dbtypes/api/schema/apiSave';
import { Action } from './components/ActionMenu/actionMenuOptions';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectSaveId, setMapDimensions, setSaveId } from './features/saves/saveSlice';


function App() {
	// Which menu window is open
	const [windowIndex, setWindowIndex] = useState<WindowState>({
		window: Windows.Closed,
		initial: {}
	});
	// Current mouse cursor action active
	const [action, setAction] = useState<Action>(Action.Default);

	const saveId = useAppSelector(selectSaveId);
	const dispatch = useAppDispatch();

	const { data: company } = useQuery<GETCurrentCompanyResponse | null>({
		queryKey: ['player', saveId],
		queryFn: () => fetch(`${baseUrl}/data/${saveId}/companies/player`).then(res => res.json()),
		enabled: saveId !== null,
		initialData: null,
	})

	const { data: allSaves } = useQuery<GETAllSaveResponse | null>({
		queryKey: ['currentsave'],
		queryFn: () => fetch(`${baseUrl}/saves`).then(res => res.json()),
		// enabled: import.meta.env.VITE_ENABLE_SOCKET !== 'on',
		initialData: null
	})

	const saveQuery = useQuery<GETOneSaveResponse | null>({
		queryKey: ['save', saveId],
		queryFn: () => fetch(`${baseUrl}/saves/${saveId}`).then(res => res.json()),
		enabled: saveId !== null,
		initialData: null,
	})

	// Once all saves are retrieved, pre-emptively load first one if socket is disabled.
	useEffect(() => {
		if (allSaves) {
			const firstSave = allSaves.at(0);
			if (firstSave) {
				console.log("Setting ", firstSave.id)
				dispatch(setSaveId(firstSave.id));
			}
		}
	}, [allSaves])

	useEffect(() => {
		if (saveQuery.data) {
			dispatch(setMapDimensions({ mapWidth: saveQuery.data.mapWidth, mapHeight: saveQuery.data.mapHeight }))
		}
	}, [saveQuery.data?.mapWidth, saveQuery.data?.mapHeight])

	return (
		<>
			{/* <WelcomeModal/> */}
			<div className={styles.background}>
				{saveId &&
					<MapController {...{
						action,
						setAction,
						setWindowIndex,
						saveId,
						company,
						saveQuery
					}} />
				}
				<div className={styles.menuContainer}>
					<MenuController {...windowIndex} {...{
						action,
						setAction,
						setWindowIndex,
						saveId,
					}} />
					{(saveQuery.data && !saveQuery.isFetching && !saveQuery.isError) && <ActionController {...{ action, setAction }} initial={{}} />}
				</div>
			</div>
			{import.meta.env.VITE_ENABLE_SOCKET === 'on' && <NotificationsPanel />}
		</>
	);
};

export default App


