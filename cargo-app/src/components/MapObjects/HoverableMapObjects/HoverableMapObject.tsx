import { Key, ReactElement } from "react";
import MapObject, { MapObjectProps } from "../MapObject";
import { TileCoordinate } from "../../../model/Point";

// Implemented by any tooltip
export interface ToolTipRenderer<T> extends React.FC<T> {}

// Type of tooltip
export enum ToolTipType {
    NONE = 0,
    INDUSTRY,
    DISTANCE,
    STATION,
    SIGN,
    TOWN
}

export interface IShowsToolTipOnHover {
    showToolTip(event: React.MouseEvent<Element, MouseEvent>, tt: ReactElement, coordinates: TileCoordinate): void;
    // Callback to hide the tooltip
    hideToolTip(key: Key | null): void;
}

// Additional props that must be given to hoverable map objects.
export interface HoverProps<Z = {}> extends IShowsToolTipOnHover {
    // Type of tool tip data.
    tooltipType: ToolTipType;
    // factory used to create abstract tooltip
    TTComponent: ToolTipRenderer<Z>;
    saveId: number
}

// Props to be received by tooltip
export type ToolTipProps<T, P = {}> = MapObjectProps<T> & P & { saveId: number };

// All props
export type HoverableMapObjectProps<T, P = {}> = MapObjectProps<T> & HoverProps<ToolTipProps<T, P>> & P;

abstract class HoverableMapObject<T, P = {}> extends MapObject<T, P & HoverProps<ToolTipProps<T, P>> & ToolTipProps<T, P>> {
    constructor(props: MapObjectProps<T> & P & HoverProps<ToolTipProps<T, P>> & ToolTipProps<T, P>) {
        super(props);
        // Initialize the visible tooltip to nothing
        this.tooltip = null;
        this.TTComponent = this.props.TTComponent;
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }
    tooltip: ReactElement | null;
    TTComponent: ToolTipRenderer<ToolTipProps<T, P>>;

    // Get tooltip render location from props 
    getToolTipOffset(data: T): TileCoordinate {
        return { x: 5, y: 5 };
    }

    onMouseEnter(event: React.MouseEvent<Element, MouseEvent>): void {
        if (this.tooltip) {
            this.props.hideToolTip(this.tooltip.key)
        }
        const Fact = this.TTComponent
        this.tooltip = <Fact {...this.props}/>
        if (this.tooltip) {
            this.props.showToolTip(event, this.tooltip, this.getToolTipOffset(this.props.data));
        }
    }

    onMouseLeave(event: React.MouseEvent<Element, MouseEvent>): void {
        if (this.tooltip) {
            this.props.hideToolTip(this.tooltip.key)
        }
    }
}

export default HoverableMapObject;