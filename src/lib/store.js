import { configureStore } from "@reduxjs/toolkit";

import displayReducer from "./features/themeSlice"
import selectionReducer from "./features/selectionSlice"

export const store = configureStore({
    reducer: {
        display: displayReducer,
        selection: selectionReducer
    },
})