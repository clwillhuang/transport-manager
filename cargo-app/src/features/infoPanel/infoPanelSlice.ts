import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

export type InfoPanelProps = {
    id: number
} | null;

export enum InfoPanelMode {
    Default,
    Industry,
    Station,
    DistanceMeasure,
    Circle,
    Sign,
    Town,
    TrackSegment,
}

export interface InfoPanelState {
    infoPanelMode: InfoPanelMode
    infoPanelProps: InfoPanelProps,
}

const initialState: InfoPanelState = {
    infoPanelMode: InfoPanelMode.Default,
    infoPanelProps: null
};

export const infoPanelSlice = createSlice({
    name: 'infopanel',
    initialState,
    reducers: {
        setInfoPanelMode: (state, action: PayloadAction<{ infoPanelMode: InfoPanelMode, infoPanelProps: InfoPanelProps}>) => {
            state.infoPanelMode = action.payload.infoPanelMode;
            if (action.payload.infoPanelProps === null) {
                state.infoPanelProps = null;
            } else {
                state.infoPanelProps = { ...action.payload.infoPanelProps }
            }
        }
    }
});

export const { setInfoPanelMode } = infoPanelSlice.actions;

export const selectInfoPanelMode = (state: RootState) => state.infoPanel.infoPanelMode;

export const selectInfoPanelProps = (state: RootState) => state.infoPanel.infoPanelProps;

export default infoPanelSlice.reducer;