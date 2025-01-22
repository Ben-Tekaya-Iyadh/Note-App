import useTheme from "../hooks/useTheme";
import classes from "./FormActions.module.css";
import { Link } from "react-router-dom";

function FormActions({ cancelHandler, submitHandler }) {
  const {darkMode} = useTheme()
  return (
    <div className={classes.form_actions}>
      <Link
        to="../"
        onClick={cancelHandler}
        type="reset"
        className={classes.text_btn + " " + (darkMode ? classes.dark : "")}
      >
        Cancel
      </Link>
      <button
        onClick={submitHandler}
        className={classes.btn + " " + (darkMode ? classes.dark : "")}
        type="submit"
      >
        Add Note
      </button>
    </div>
  );
}

export default FormActions;
