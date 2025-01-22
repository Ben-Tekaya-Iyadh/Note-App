import classes from "./Header.module.css";
import useTheme from "../../hooks/useTheme";

export default function Header({ children, title }) {
  const { darkMode } = useTheme();
  return (
    <div className={classes.header + " " + (darkMode ? classes.dark : "")}>
      {title && <p className={classes.title}>{title}</p>}
      {children}
    </div>
  );
}
