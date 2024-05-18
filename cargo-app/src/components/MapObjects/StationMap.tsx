// Draw shape icons on the map
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import { InformationPaneMode } from "../InfoPanel/InformationPaneMode";
import StationToolTip from "../tooltips/StationToolTip";
import { GenericMapProps, OpensInfoPanel } from "./GenericMapProps";
import { ToolTipType } from "./HoverableMapObjects/HoverableMapObject";
import StationMapObject from "./StationMapObject";
import type { GETAllStationResponse } from "~shared/api/schema/apiStation";
import type { Station } from "~shared/db/schema/station";
import { StationType } from "../MapSettings/StationFilter";
// import { TrackConnectableObjectProps } from "./TrackConnectableObjectProps";

interface StationMapProps extends GenericMapProps, OpensInfoPanel {
    stationsVisible: StationType[]
}

function StationMap(props: StationMapProps) {

    const { data: allStations } = useQuery<GETAllStationResponse>({
        queryKey: ['station'],
        queryFn: () => fetch(`${baseUrl}/data/${props.saveId}/stations`).then(res => res.json())
    })

    if (!allStations) return <></>
        
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
                    tooltipType={ToolTipType.STATION}
                    // buildTrack={buildTrack}
                    key={`mapcircle${index}`}
                    data={data}
                    TTComponent={StationToolTip}
                    {...props}
                    infoPanelMode={InformationPaneMode.Station}
                />)
            }
        </g>
    )
}

export default StationMap;