import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

export interface SaveState {
    saveId: number | null,
    mapSize: {
        mapWidth: number,
        mapHeight: number
    }
}

const initialState: SaveState = {
    saveId: null,
    mapSize: {
        mapWidth: 0,
        mapHeight: 0
    }
} as SaveState;

export const saveSlice = createSlice({
    name: 'save',
    initialState,
    reducers: {
        setSaveId: (state, action: PayloadAction<number | null>) => {
            state.saveId = action.payload
        },
        setMapDimensions: (state, action: PayloadAction<{ mapWidth: number, mapHeight: number }>) => { state.mapSize = action.payload }
    }
});

export const { setSaveId, setMapDimensions } = saveSlice.actions;

export const selectSaveId = (state: RootState) => {
    return state.saves.saveId;
};

export const selectMapDimensions = (state: RootState) => state.saves.mapSize;

export default saveSlice.reducer;