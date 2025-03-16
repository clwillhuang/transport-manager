import { configureStore } from "@reduxjs/toolkit";
import saveSlice from "../features/saves/saveSlice";

export const store = configureStore({
    reducer: {
        saves: saveSlice
    }   
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
