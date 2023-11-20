import { configureStore } from "@reduxjs/toolkit";
import gameslicer from "./gameslicer"
export const store = configureStore({
    reducer: {
        game: gameslicer
    }
})