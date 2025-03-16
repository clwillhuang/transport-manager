// import CoverageConnection from "@dbtypes/db/schema/CoverageConnection";
import { InfoPanelMode } from "../../features/infoPanel/infoPanelSlice";
import { ToolTipMode } from "../../features/tooltips/tooltipSlice";
import useConvertTileToCanvas from "./Helpers/useConvertTileToCanvas";
import useMapObjectEvents from "./Helpers/useMapObjectEvents";
import type { Station } from "@dbtypes/db/schema/station";

export type StationMapObjectProps = { data: Station }

// A map object meant to represent a train station
// TODO add connectable func
const StationMapObject = (props: StationMapObjectProps) => {

    const convertTileToCanvas = useConvertTileToCanvas();
    const { openInfoPanel, showToolTipOverObject } = useMapObjectEvents();
    const toolTipEvents = showToolTipOverObject(ToolTipMode.Station, { data: props.data });
    
    const { x, y, name, id } = props.data;
    const converted = convertTileToCanvas.ConvertTileToCanvasCoordinate({ x, y });

    return (
        <g transform={`translate(${converted.x}, ${converted.y})`}
            {...toolTipEvents}
            onMouseDown={openInfoPanel(InfoPanelMode.Station, { id })}
            style={{ cursor: "pointer" }}
        >
            {/* {coverage.map((c: CoverageConnection, i: number) => {
                    const {x: otherX, y: otherY} = c.connectedObject.getLocation();
                    return <line x1={0} y1={0} x2={otherX - x} y2={otherY - y} stroke='green' strokeWidth='1px' key={`${id}-cov${i}`}/>
                })} */}
            <circle
                cx={0}
                cy={0}
                r={5}
                fill='orange'
                stroke='#000000'
                strokeWidth={1}
            />
            <text x={6} y={2} fontSize="5" fontFamily="Arial" fill="white">
                {name}
            </text>

            {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--> */}
            <svg xmlns="http://www.w3.org/2000/svg" height="5" width="5" viewBox="0 0 448 512" x='-2.5' y='-2.5'>
                <path d="M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 96c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96zM224 288a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
        </g>
    );

}

export default StationMapObject;
