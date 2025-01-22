import useTheme from "../../hooks/useTheme";
import classes from "./Footer.module.css"

function Footer({children}) {
    const {darkMode} = useTheme();
    return ( 
        <div className={classes.footer +" " + (darkMode? classes.dark : "")}>
            {children}
        </div>
     );
}

export default Footer;