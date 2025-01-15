import { Link } from "react-router-dom";
import classes from "./AddBtn.module.css";
import { Plus } from "@phosphor-icons/react";

function AddBtn({dark}) {

  return (
    <div className={classes.add_btn + " " + (dark? classes.dark : "")}>
      <Link to="/newNote">
        <Plus size={32} weight="bold" />
      </Link>
    </div>
  );
}

export default AddBtn;
