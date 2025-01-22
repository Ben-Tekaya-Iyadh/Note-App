import useTheme from "../../hooks/useTheme";
import classes from "./Input.module.css";

function Input({ textArea, title, ...props }) {
  const {darkMode} = useTheme()
  return (
    <div className={classes.input + " " + (darkMode ? classes.dark : "")}>
      <label htmlFor={title}>{title} :</label>
      {!textArea ? (
        <input {...props} id={title} />
      ) : (
        <textarea {...props} id={title}></textarea>
      )}
    </div>
  );
}

export default Input;
