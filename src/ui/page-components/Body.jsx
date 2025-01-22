import useTheme from "../../hooks/useTheme";
import classes from "./Body.module.css"
function Body({children}) {
    const {darkMode}= useTheme()
    return ( <div className={classes.container + (darkMode ? " light-dark" : "")}>
        {children}
    </div> );
}

export default Body;