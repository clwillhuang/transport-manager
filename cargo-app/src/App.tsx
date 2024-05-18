import { createContext, useState } from 'react'
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
import { InformationPaneControllerData } from './components/InfoPanel/InformationPaneController';
import { InformationPaneMode } from './components/InfoPanel/InformationPaneMode';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from './tools/serverConn';
import type { GETCurrentCompanyResponse } from '~shared/api/schema/apiCompany';
import NotificationsPanel from './components/Notifications/NotificationsPanel';
import type { GETOneSaveResponse } from '~shared/api/schema/apiSave';
import { Action } from './components/ActionMenu/actionMenuOptions';

type SaveContextType = {
	saveId: number | null,
}

export const SaveContext = createContext<SaveContextType | undefined>(undefined);

function App() {
	// Which menu window is open
	const [windowIndex, setWindowIndex] = useState<WindowState>({
		window: Windows.Closed,
		initial: {}
	});
	// Current mouse cursor action active
	const [action, setAction] = useState<Action>(Action.Default);
	// Top right info panel
	const [infoPanel, setInfoPanel] = useState<InformationPaneControllerData>({
		infoPanelMode: action !== Action.DistanceMeasure ? InformationPaneMode.Default : InformationPaneMode.DistanceMeasure,
		data: null,
	});
	const [saveId, setSaveId] = useState<number | null>(null);

	const { data: company } = useQuery<GETCurrentCompanyResponse | null>({
		queryKey: ['player'],
		queryFn: () => fetch(`${baseUrl}/data/${saveId}/companies/player`).then(res => res.json()),
		enabled: !!saveId,
		initialData: null,
	})

	const saveQuery = useQuery<GETOneSaveResponse | null>({
		queryKey: ['save'],
		queryFn: () => fetch(`${baseUrl}/saves/${saveId}`).then(res => res.json()),
		enabled: !!saveId,
		initialData: null,
	})

	return (
		<SaveContext.Provider value={{ saveId }}>
			
			<div className={styles.background}>
				{saveId &&
					<MapController {...{
						action,
						setAction,
						infoPanel,
						setInfoPanel,
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
						setSaveId,
					}} />
					{ (saveQuery.data && !saveQuery.isFetching && !saveQuery.isError) && <ActionController {...{action, setAction}} initial={{}}/> }
				</div>
			</div>
			<NotificationsPanel/>	
		</SaveContext.Provider>
	);
};

export default App


