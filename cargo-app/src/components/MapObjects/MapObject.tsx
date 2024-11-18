import { Component } from "react";
import { InformationPaneControllerData } from "../InfoPanel/InformationPaneController";
import { InformationPaneMode } from "../InfoPanel/InformationPaneMode";
import { TileCoordinate } from "../../model/Point";

export function ConvertTileToCanvasCoordinate(t: TileCoordinate, mapSize: { mapWidth: number, mapHeight: number }): { x: number, y: number } {
    return {x: mapSize.mapWidth - t.x, y: t.y}
}

export interface MapObjectProps<T> {
    data: T;
    infoPanelMode: InformationPaneMode;
    setInfoPanel(data: InformationPaneControllerData): void;
    mapSize: { mapWidth: number, mapHeight: number };
}

// An object that is clickable.
abstract class MapObject<T, P = {}> extends Component<MapObjectProps<T> & P> {
    constructor(props: MapObjectProps<T> & P) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    abstract override render(): JSX.Element;

    onMouseDown(_event: React.MouseEvent<Element, MouseEvent>): void {
        this.props.setInfoPanel(this.props);
    }
}

export default MapObject;