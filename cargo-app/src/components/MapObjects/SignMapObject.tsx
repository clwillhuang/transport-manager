import type { Sign } from "@dbtypes/db/schema/sign";
import useConvertTileToCanvas from "./Helpers/useConvertTileToCanvas";
import { ToolTipMode } from "../../features/tooltips/tooltipSlice";
import useMapObjectEvents from "./Helpers/useMapObjectEvents";
import { InfoPanelMode } from "../../features/infoPanel/infoPanelSlice";

export const compareSignObjects = (sign1: Sign, sign2: Sign): boolean => {
    // Compare each property
    return (
        sign1.id === sign2.id &&
        sign1.x === sign2.x &&
        sign1.y === sign2.y &&
        sign1.text === sign2.text
    );
};

export type SignMapObjectProps = { data: Sign }

// A map object meant to represent a train station
const SignMapObject = (props: SignMapObjectProps) => {

    const { x, y, text, id } = props.data;

    const convertTileToCanvas = useConvertTileToCanvas();
    const { openInfoPanel, showToolTipOverObject } = useMapObjectEvents();
    const toolTipEvents = showToolTipOverObject(ToolTipMode.Sign, { data: props.data });

    const converted = convertTileToCanvas.ConvertTileToCanvasCoordinate({ x, y });

    return (
        <g transform={`translate(${converted.x}, ${converted.y})`}
            onMouseDown={openInfoPanel(InfoPanelMode.Sign, { id })}
            {...toolTipEvents}
        >
            <text x={0} y={0} fontSize="5" fontFamily="Arial" fill="white">
                {text}
            </text>
        </g>
    );

}

export default SignMapObject;
