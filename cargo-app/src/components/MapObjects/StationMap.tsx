// Draw shape icons on the map
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import StationMapObject from "./StationMapObject";
import type { GETAllStationResponse } from "@dbtypes/api/schema/apiStation";
import type { Station } from "@dbtypes/db/schema/station";
import { StationType } from "../MapSettings/StationFilter";
import { useAppSelector } from "../../app/hooks";
import { selectSaveId } from "../../features/saves/saveSlice";
// import { TrackConnectableObjectProps } from "./TrackConnectableObjectProps";

interface StationMapProps {
    stationsVisible: StationType[]
}

function StationMap(props: StationMapProps) {

    const saveId = useAppSelector(selectSaveId);

    const { data: allStations } = useQuery<GETAllStationResponse>({
        queryKey: ['station'],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/stations`).then(res => res.json()),
        enabled: saveId !== null,
    })

    if (saveId === null || !allStations) return <></>
        
    const data = allStations.filter((s: Station) => 
        props.stationsVisible.includes(StationType.Train) && s.hasTrain ||
        props.stationsVisible.includes(StationType.Bus) && s.hasBus ||
        props.stationsVisible.includes(StationType.Truck) && s.hasTruck ||
        props.stationsVisible.includes(StationType.Dock) && s.hasDock ||
        props.stationsVisible.includes(StationType.Airport) && s.hasAirport
    )

    return (
        <g>
            {
                data.map((data: Station, index: number) => <StationMapObject
                    // buildTrack={buildTrack}
                    key={`mapcircle${index}`}
                    data={data}
                />)
            }
        </g>
    )
}

export default StationMap;