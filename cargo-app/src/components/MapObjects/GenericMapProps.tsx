import React from "react";
import { IShowsToolTipOnHover } from "./HoverableMapObjects/HoverableMapObject";
import { InformationPaneControllerData } from "../InfoPanel/InformationPaneController";

export interface GenericMapProps extends IShowsToolTipOnHover {
    saveId: number;
    tooltipDiv: React.RefObject<HTMLDivElement>;
    mapSize: { mapWidth: number, mapHeight: number }
}

export interface OpensInfoPanel {
    infoPanel: InformationPaneControllerData,
    setInfoPanel(data: InformationPaneControllerData): void;
}