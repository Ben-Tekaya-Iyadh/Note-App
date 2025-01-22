import useTheme from "../hooks/useTheme";
import classes from "./Loading.module.css";

function Loading() {
  const { darkMode } = useTheme();

  return (
    <div className={classes.container + " " + (darkMode ? classes.dark : "")}>
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </div>
  );
}

function Dot() {
  const { darkMode } = useTheme();
  return (
    <div className={classes.dot + " " + (darkMode ? classes.dark : "")}></div>
  );
}

export default Loading;
