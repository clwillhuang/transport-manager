import { useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl, fetchDELETEFactory } from "../../tools/serverConn";
import type { GETOneStationResponse } from "@dbtypes/api/schema/apiStation";
import { BaseInfoPanelProps } from "./BaseInfoPanelProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";
import { faPlane } from "@fortawesome/free-solid-svg-icons/faPlane";
import { faTrain } from "@fortawesome/free-solid-svg-icons/faTrain";
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import StationCargoEntry from './StationCargoPanel'
import { faShip } from "@fortawesome/free-solid-svg-icons/faShip";
import UpdateStationModal from "../Modals/UpdateStationModal";
import styles from './InfoPanel.module.css'
import { Button } from "react-bootstrap";

export interface StationInfoPanelProps extends BaseInfoPanelProps {
    // data: Station,
    // setStationData: UpdateOneAction<Station>,
    // onStartConnectingStation(station: Station | null): void,
};

const StationInfoPanel = ({ id, saveId, onClose }: StationInfoPanelProps) => {
    const queryClient = useQueryClient();

    const { data } = useQuery<GETOneStationResponse>({
        queryKey: ['station', id],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/stations/${id}`, { method: 'GET' }).then(res => res.json())
    })

    if (!data || !data.id) {
        return <></>
    }

    const { name, x, y, hasAirport, hasBus, hasDock, hasTrain, hasTruck } = data;

    const deleteStation = async () => {
        await fetchDELETEFactory(`${baseUrl}/data/${saveId}/stations/${data.id}`, {})
        queryClient.invalidateQueries({ queryKey: ['station'] })
        onClose();
    }

    return (
        <>
            <span id='card-type'>STATION</span>
            <h2>{name}</h2>
            <span className={styles.iconRow}>
                {hasTrain && <FontAwesomeIcon size='2x' icon={faTrain} />}
                {hasTruck && <FontAwesomeIcon size='2x' icon={faTruck} />}
                {hasAirport && <FontAwesomeIcon size='2x' icon={faPlane} />}
                {hasBus && <FontAwesomeIcon size='2x' icon={faBus} />}
                {hasDock && <FontAwesomeIcon size='2x' icon={faShip} />}
            </span>
            <h3>Cargo Waiting</h3>
            <div>
                <StationCargoEntry data={data}/>
            </div>
            <h3>Location</h3>
            <div>
                <span>X: {x}, Y: {y}</span>
            </div>
            <div>
                <UpdateStationModal stationData={data} saveId={saveId} />
                <Button onClick={deleteStation}>
                    Delete
                </Button>
            </div>
        </>
    )
}

export default StationInfoPanel



