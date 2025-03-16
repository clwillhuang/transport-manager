import { useQuery } from '@tanstack/react-query';
import styles from './GeneralMapInformation.module.css'
import { GETOneSaveResponse } from "@dbtypes/api/schema/apiSave";
import { baseUrl } from '../../tools/serverConn';
import { useAppSelector } from '../../app/hooks';
import { selectSaveId } from '../../features/saves/saveSlice';

const GeneralMapInformation = () => {
    const saveId = useAppSelector(selectSaveId);

    const { data } = useQuery<GETOneSaveResponse>({
        queryKey: ['save'],
        queryFn: () => fetch(`${baseUrl}/saves/${saveId}`).then(res => res.json()),
        enabled: saveId !== null
    })

    if (!data) return <></>

    return(
    <div className={styles.parent}>
        <strong>Map Information</strong>
        <span>Save Game</span>
        <p>{data.serverName} (ID: {data.id})</p>
        <span>Map Size (w x h)</span>
        <p>{data.mapWidth} tiles x {data.mapHeight} tiles</p>
        <span>Map Seed</span>
        <p>{data.mapSeed}</p>
	</div>
    )
}

export default GeneralMapInformation;