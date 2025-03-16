// Draw shape icons on the map
import { InformationPaneMode } from "../InfoPanel/InformationPaneMode";
import TownToolTip from "../tooltips/TownToolTip";
import { ConnectionProps } from "./ConnectableMapObject";
import { ToolTipType } from "./HoverableMapObjects/HoverableMapObject";
import TownMapObject from "./TownMapObject";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import { GenericMapProps, OpensInfoPanel } from "./GenericMapProps";
import type { Town } from "@dbtypes/db/schema/town";
import type { GETAllTownResponse } from "@dbtypes/api/schema/apiTown";
import { useAppSelector } from "../../app/hooks";
import { selectSaveId } from "../../features/saves/saveSlice";

interface TownMapProps extends GenericMapProps, OpensInfoPanel, ConnectionProps {}

function TownMap(props: TownMapProps) {

    const saveId = useAppSelector(selectSaveId);

    const { data } = useQuery<GETAllTownResponse>({
        queryKey: ['town'],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/towns`).then(res => res.json()),
        enabled: saveId !== null,
    })

    if (saveId === null || !data) return <></>
    
    return (
        <g>
            {
                data.map((data: Town) => <TownMapObject
                    key={`townmapobject${data.id}`}
                    tooltipType={ToolTipType.TOWN}
                    data={data}
                    TTComponent={TownToolTip}
                    infoPanelMode={InformationPaneMode.Town}
                    {...props}
                />)
            }
        </g>
    )
}

export default TownMap;