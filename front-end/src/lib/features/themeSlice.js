import { createSlice } from "@reduxjs/toolkit";

const displaySlice = createSlice({
    name: 'display',
    initialState: {
        darkMode: loadMode(),
        galery: loadGalery(),
    },
    reducers: {
        toggleDarkMode(state, action) {
            state.darkMode = !state.darkMode;
            localStorage.setItem("darkMode", state.darkMode);
        },

        toggleGalery(state, action) {
            state.galery = !state.galery;
            localStorage.setItem("isGalery", state.galery);
        }
    }
})

export default displaySlice.reducer;

export const { toggleDarkMode, toggleGalery, startSearch, endSearch } = displaySlice.actions


function loadMode() {
    let mode = false;
    try {
        mode = JSON.parse(localStorage.getItem("darkMode"));
    } catch (error) {
        localStorage.setItem("darkMode", false)
    }

    return mode
}

function loadGalery() {
    let isGalery = false;
    try {
        isGalery = JSON.parse(localStorage.getItem("isGalery"));
    } catch (error) {
        localStorage.setItem("isGalery", false)
    }

    return isGalery
}