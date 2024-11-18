import React from "react";
import HoverableMapObject, { HoverableMapObjectProps, HoverProps, ToolTipProps } from "./HoverableMapObjects/HoverableMapObject";
import { MapObjectProps } from "./MapObject";
import { ICoverageCoverable } from "../../model/CoverageConnection";
import type { Station } from "@dbtypes/db/schema/station";

// What is the current action to be performed when a connectable object is clicked on?
export enum ConnectMode { 
    Inactive = 'Inactive',
    Connect = 'Connect',
    Disconnect = 'Disconnect'
}

export interface CoverageConnectionProps { 
    mapMode: ConnectMode,   
    selectedStation: Station | null,
}

export interface ConnectionProps {
    coverageConnectionProps: CoverageConnectionProps
    onFinishCoverageConnection(T: ICoverageCoverable): void;
} 

export type ConnectableMapObjectProps<T, P = {}> = HoverableMapObjectProps<T, P> & ConnectionProps & P;

// Superclass of any object that can be connected to with a station
abstract class ConnectableMapObject<T, P = {}> extends HoverableMapObject<T, ConnectionProps & P> {
    constructor(props: MapObjectProps<T> & ConnectionProps & P & HoverProps<ToolTipProps<T, ConnectionProps & P>>)  {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    updateConnection(mapMode: ConnectMode): void {
        console.log(mapMode);
        // if (!this.props.coverageConnectionProps.selectedStation) return;
        // if (mapMode === ConnectMode.Connect) {
        //     this.props.coverageConnectionProps.selectedStation.addCoverageConnection(this.props.data);
        // } else if (mapMode === ConnectMode.Disconnect) {
        //     this.props.coverageConnectionProps.selectedStation.removeCoverageConnection(this.props.data);
        // }
    }

    override onMouseDown(event: React.MouseEvent<Element, MouseEvent>): void {
        super.onMouseDown(event);
        // if (this.props.coverageConnectionProps.mapMode !== ConnectMode.Inactive) {
        //     this.updateConnection(this.props.coverageConnectionProps.mapMode);
        //     this.props.onFinishCoverageConnection(this.props.data);
        // } else {
        //     super.onMouseDown(event);
        // }
    }
}

export default ConnectableMapObject;