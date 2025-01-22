import { useDispatch, useSelector } from "react-redux";
import {toggleDarkMode} from "../lib/features/themeSlice"

export default function useTheme() {
    const darkMode = useSelector(state => state.display.darkMode);
    const dispatch = useDispatch();

    const toggle =() => {
        dispatch(toggleDarkMode());
    }
    
    return {
        darkMode,
        toggleDarkMode: toggle
    }
}