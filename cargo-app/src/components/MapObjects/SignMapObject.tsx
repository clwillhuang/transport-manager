import { TileCoordinate } from "../../model/Point";
import type { Sign } from "~shared/db/schema/sign";
import HoverableMapObject from "./HoverableMapObjects/HoverableMapObject";
import { ConvertTileToCanvasCoordinate } from "./MapObject";

export const compareSignObjects = (sign1: Sign, sign2: Sign): boolean => {
    // Compare each property
    return (
        sign1.id === sign2.id &&
        sign1.x === sign2.x &&
        sign1.y === sign2.y &&
        sign1.text === sign2.text
    );
};

// A map object meant to represent a train station
class SignMapObject extends HoverableMapObject<Sign> {

    // Implement the render method to create the station icon
    render() {
        const { x: mapX, y: mapY, text } = this.props.data;
        const { x, y } = ConvertTileToCanvasCoordinate({ x: mapX, y: mapY }, this.props.mapSize);
        return (
            <g transform={`translate(${x}, ${y})`}
                onMouseDown={this.onMouseDown}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <text x={0} y={0} fontSize="5" fontFamily="Arial" fill="white">
                    {text}
                </text>
            </g>
        );
    }
}

export default SignMapObject;
