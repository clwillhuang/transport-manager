import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

export interface SaveState {
    saveId: number | null
}

const initialState: SaveState = {
    saveId: null
} as SaveState;

export const saveSlice = createSlice({
    name: 'save',
    initialState,
    reducers: {
        setSaveId: (state, action: PayloadAction<number | null>) => {
            state.saveId = action.payload
        }
    }
});

export const { setSaveId } = saveSlice.actions;

export const selectSaveId = (state: RootState) => {
    return state.saves.saveId;
};

export default saveSlice.reducer;