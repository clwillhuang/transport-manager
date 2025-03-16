import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IndustryMapObjectProps } from "../../components/MapObjects/IndustryMapObject";
import { RootState } from "../../app/store";
import { TownMapObjectprops } from "../../components/MapObjects/TownMapObject";
import { StationMapObjectProps } from "../../components/MapObjects/StationMapObject";
import { CircleMapObjectProps } from "../../components/MapObjects/CircleMapObject";
import { SignMapObjectProps } from "../../components/MapObjects/SignMapObject";

export enum ToolTipMode {
    Hidden,
    Industry,
    Station,
    DistanceMeasure,
    Circle,
    Sign,
    Town,
    TrackSegment,
}

export type ToolTipStateData = IndustryMapObjectProps | TownMapObjectprops | StationMapObjectProps | CircleMapObjectProps | SignMapObjectProps | null;

export interface ToolTipState {
    mode: ToolTipMode,
    data: ToolTipStateData,
    event: {
        clientX: number,
        clientY: number
    }
}

const initialState: ToolTipState = {
    mode: ToolTipMode.Hidden,
    data: null,
    event: { clientX: 0, clientY: 0 }
}

export const toolTipSlice = createSlice({
    name: 'tooltip',
    initialState,
    reducers: {
        hideToolTip: (state) => {
            state.mode = ToolTipMode.Hidden;
            state.data = null;
        },
        showToolTip: (state, action: PayloadAction<ToolTipState>) => {
            state.mode = action.payload.mode;
            state.data = action.payload.data;
            state.event = action.payload.event;
        }
    }
});

export const { hideToolTip, showToolTip } = toolTipSlice.actions;

export const selectToolTipMode = (state: RootState) => state.tooltip.mode;

export const selectToolTipData = (state: RootState) => state.tooltip.data;

export const selectToolTipEvent = (state: RootState) => state.tooltip.event;

export default toolTipSlice.reducer;