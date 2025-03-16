import { Component } from "react";
import { TileCoordinate } from "../../model/Point";
import { InfoPanelMode, setInfoPanelMode } from "../../features/infoPanel/infoPanelSlice";

export function ConvertTileToCanvasCoordinate(t: TileCoordinate, mapSize: { mapWidth: number, mapHeight: number }): { x: number, y: number } {
    return {x: mapSize.mapWidth - t.x, y: t.y}
}

export interface MapObjectProps<T> {
    data: T;
    infoPanelMode: InfoPanelMode;
    setInfoPanel: typeof setInfoPanelMode
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
        // this.props.setInfoPanel({ infoPanelMode: this.props.infoPanelMode, infoPanelProps: { id: 1 } });
    }
}

export default MapObject;