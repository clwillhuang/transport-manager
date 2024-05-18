import HoverableMapObject from "./HoverableMapObjects/HoverableMapObject";
import { TileCoordinate } from "../../model/Point";
import { Circle } from "~shared/db/schema/circle"
import { ConvertTileToCanvasCoordinate } from "./MapObject";

const STROKE_WIDTH = '3px'

// A circle meant to convey circular distance data
class CircleMapObject extends HoverableMapObject<Circle> {

    // Implement the render method to create the circle element
    render() {
        const { x: mapX, y: mapY, radius, color, circleType } = this.props.data;
        const { x, y } = ConvertTileToCanvasCoordinate({ x: mapX, y: mapY }, this.props.mapSize);
        if (circleType === 'euclidean') {
            return (
                <>
                    <circle
                        cx={x}
                        cy={y}
                        r={radius}
                        fill="none"
                        stroke={`#${color}`}
                        strokeWidth={STROKE_WIDTH}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        onMouseDown={this.onMouseDown}
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
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        onMouseDown={this.onMouseDown}
                    />
                </g>
            )
        } else {
            return <></>
        }
    }
}

export default CircleMapObject;