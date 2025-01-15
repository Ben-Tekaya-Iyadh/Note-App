import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSelecting: false,
    selectedItems: [],
}

const selectionSlice = createSlice({
    name: "selection",
    initialState,
    reducers: {
        startSelection(state) {
            state.isSelecting = true;
        },

        endSelection(state) {
            state.isSelecting = false;
            state.selectedItems = []
        },

        addSelection(state, action) {
            const id = action.payload;
            const existing = state.selectedItems.includes(id)
            if (existing) {
                state.selectedItems = state.selectedItems.filter(selected => selected !== id);
                return;
            }

            state.selectedItems = [...state.selectedItems, id];
            console.log(state.selectedItems)
        },

        // removeSelection(state, action) {
        //     state.selectedItems = state.selectedItems.filter(i => i !== action.id);
        // }
    }
})


export const { startSelection, endSelection, addSelection, removeSelection } = selectionSlice.actions;

export default selectionSlice.reducer;

