// import CoverageConnection from "@dbtypes/db/schema/CoverageConnection";
import HoverableMapObject, { HoverProps, ToolTipProps } from "./HoverableMapObjects/HoverableMapObject";
import { ConvertTileToCanvasCoordinate, MapObjectProps } from "./MapObject";
import { TrackConnectableObjectProps } from "./TrackConnectableObjectProps";
import { TileCoordinate } from "../../model/Point";
import type { Station } from "~shared/db/schema/station";

// A map object meant to represent a train station
class StationMapObject extends HoverableMapObject<Station, TrackConnectableObjectProps> {

    constructor(props: MapObjectProps<Station> & TrackConnectableObjectProps & HoverProps<ToolTipProps<Station, TrackConnectableObjectProps>>) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
    }
    
    override onMouseDown(event: React.MouseEvent<Element, MouseEvent>): void {
        super.onMouseDown(event);
        // this.props.buildTrack(this.props.data);
    }

    // Implement the render method to create the station icon
    render() {
        const { x: mapX, y: mapY } = this.props.data;
        const { x, y } = ConvertTileToCanvasCoordinate({ x: mapX, y: mapY }, this.props.mapSize);
        // const { coverage } = this.props.data;
        return (
            <g transform={`translate(${x}, ${y})`}
                onMouseDown={this.onMouseDown}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
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
                
                {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--> */}
                <svg xmlns="http://www.w3.org/2000/svg" height="5" width="5" viewBox="0 0 448 512" transform={`translate(-2.5, -2.5)`}>
                    <path d="M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 96c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96zM224 288a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
            </g>
        );
    }
}

export default StationMapObject;
