// Draw shape icons on the map
import { InformationPaneControllerData } from "../InfoPanel/InformationPaneController";
import { InformationPaneMode } from "../InfoPanel/InformationPaneMode";
import CircleToolTip from "../tooltips/CircleToolTip";
import CircleMapObject from "./CircleMapObject";
import { ToolTipType } from "./HoverableMapObjects/HoverableMapObject";
import { GenericMapProps, OpensInfoPanel } from "./GenericMapProps";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import type { GETAllCircleResponse } from "@dbtypes/api/schema/apiCircle";
import type { Circle } from "@dbtypes/db/schema/circle";
import { useAppSelector } from "../../app/hooks";
import { selectSaveId } from "../../features/saves/saveSlice";

interface ShapeMapProps extends GenericMapProps, OpensInfoPanel {
    infoPanel: InformationPaneControllerData,
    setInfoPanel(data: InformationPaneControllerData): void,
}

function ShapeMap(props: ShapeMapProps) {

    const saveId = useAppSelector(selectSaveId);

    const { data } = useQuery<GETAllCircleResponse>({
        queryKey: ['circle'],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/circles`).then(res => res.json()),
        enabled: saveId !== null,
    })

    if (saveId === null || !data) return <></>

    return (
        <g>
            {
                data.map((data: Circle, index: number) => <CircleMapObject
                    key={`mapcircle${index}`}
                    tooltipType={ToolTipType.INDUSTRY}
                    data={data}
                    TTComponent={CircleToolTip}
                    {...props}
                    infoPanelMode={InformationPaneMode.Circle}
                />)
            }
        </g>
    )
}

export default ShapeMap;