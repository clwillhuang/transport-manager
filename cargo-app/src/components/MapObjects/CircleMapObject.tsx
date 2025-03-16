import { Circle } from "@dbtypes/db/schema/circle"
import useConvertTileToCanvas from "./Helpers/useConvertTileToCanvas";
import { ToolTipMode } from "../../features/tooltips/tooltipSlice";
import useMapObjectEvents from "./Helpers/useMapObjectEvents";
import { InfoPanelMode } from "../../features/infoPanel/infoPanelSlice";

const STROKE_WIDTH = '3px'

export type CircleMapObjectProps = { data: Circle };

// A circle meant to convey circular distance data
const CircleMapObject = (props: CircleMapObjectProps) => {

    const convertTileToCanvas = useConvertTileToCanvas();
    const { openInfoPanel, showToolTipOverObject } = useMapObjectEvents();
    const toolTipEvents = showToolTipOverObject(ToolTipMode.Circle, { data: props.data });
    const { x, y, radius, color, circleType } = props.data;

    const converted = convertTileToCanvas.ConvertTileToCanvasCoordinate({ x, y });

    if (circleType === 'euclidean') {
        return (
            <>
                <circle
                    cx={converted.x}
                    cy={converted.y}
                    r={radius}
                    fill="none"
                    stroke={`#${color}`}
                    strokeWidth={STROKE_WIDTH}
                    onMouseDown={openInfoPanel(InfoPanelMode.Circle, { id: props.data.id })}
                    {...toolTipEvents}
                />
            </>
        );
    } else if (circleType === 'manhattan') {
        const sideLength = radius * Math.sqrt(2);
        return (
            <g transform={`translate(${x}, ${y - radius}) rotate(45)`}>
                <rect
                    x={0}
                    y={0}
                    width={sideLength}
                    height={sideLength}
                    fill="none" // Set fill to transparent for the center
                    stroke={`#${color}`} // Set the border color
                    strokeWidth={STROKE_WIDTH} // Adjust the border width as needed
                    onMouseDown={openInfoPanel(InfoPanelMode.Circle, { id: props.data.id })}
                    {...toolTipEvents}
                />
            </g>
        )
    } else {
        return <></>
    }

}

export default CircleMapObject;