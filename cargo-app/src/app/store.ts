import { configureStore } from "@reduxjs/toolkit";
import saveSlice from "../features/saves/saveSlice";
import infoPanelSlice from "../features/infoPanel/infoPanelSlice";
import tooltipSlice from "../features/tooltips/tooltipSlice";

export const store = configureStore({
    reducer: {
        saves: saveSlice,
        infoPanel: infoPanelSlice,
        tooltip: tooltipSlice
    }   
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
