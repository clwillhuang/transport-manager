import type { Industry } from "@dbtypes/db/schema/industry"
import useConvertTileToCanvas from "./Helpers/useConvertTileToCanvas";
import useMapObjectEvents from "./Helpers/useMapObjectEvents";
import { InfoPanelMode } from "../../features/infoPanel/infoPanelSlice";
import { ToolTipMode } from "../../features/tooltips/tooltipSlice";

// Map object will receive default props for Industry model + these props
export type IndustryMapObjectProps = { data: Industry } & { hex: string }

// All props given to IndustryMapObject
// TODO: Add connectable map functionality.
const IndustryMapObject = (props: IndustryMapObjectProps) => {

    const { hex, data: {x, y, id} } = props;
    const convertTileToCanvas = useConvertTileToCanvas();
    const { openInfoPanel, showToolTipOverObject } = useMapObjectEvents();
    const toolTipEvents = showToolTipOverObject(ToolTipMode.Industry, { data: props.data, hex});

    const converted = convertTileToCanvas.ConvertTileToCanvasCoordinate({x, y});

    return <circle
        style={{ cursor: "pointer" }}
        cx={converted.x}
        cy={converted.y}
        fill={`#${hex}`}
        r={5}
        stroke={'#ffff33ff'}
        strokeWidth={1}
        onMouseDown={openInfoPanel(InfoPanelMode.Industry, { id })}
        onMouseEnter={toolTipEvents.onMouseEnter}
        onMouseLeave={toolTipEvents.onMouseLeave}
    />

}

export default IndustryMapObject;