import type { Industry } from "@dbtypes/db/schema/industry"
import ConnectableMapObject, { ConnectableMapObjectProps } from "./ConnectableMapObject";
import { ConvertTileToCanvasCoordinate } from "./MapObject";

// Map object will receive default props for Industry model + these props
export interface AdditionalIndustryMapObjectProps {
    hex: string,
};

// All props given to IndustryMapObject
export type IndustryMapObjectProps = ConnectableMapObjectProps<Industry, AdditionalIndustryMapObjectProps> & AdditionalIndustryMapObjectProps;

class IndustryMapObject extends ConnectableMapObject<Industry, AdditionalIndustryMapObjectProps> {
    
    constructor(props: ConnectableMapObjectProps<Industry, AdditionalIndustryMapObjectProps> & AdditionalIndustryMapObjectProps) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    render() {
        const { x: mapX, y: mapY } = this.props.data;
        const { x, y } = ConvertTileToCanvasCoordinate({ x: mapX, y: mapY }, this.props.mapSize);
        const hex = this.props.hex;
        return <circle
                style={{cursor: "pointer"}}
                cx={x}
                cy={y}
                fill={`#${hex}`}
                r={3}
                stroke={'#000000ff'}
                strokeWidth={1}
                onMouseLeave={this.onMouseLeave}
                onMouseDown={this.onMouseDown}
                onMouseEnter={this.onMouseEnter}
            />
    }
}

export default IndustryMapObject;