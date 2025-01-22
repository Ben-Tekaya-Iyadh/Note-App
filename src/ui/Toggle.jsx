import { useState } from "react";
import classes from "./Toggle.module.css";

function Toggle({ onToggle, label, toggled }) {
  const [isToggled, setIsToggled] = useState(toggled);

  function handleClick() {
    onToggle(!isToggled);
    setIsToggled(!isToggled);
  }

  return (
    <label className={classes.toggle}>
      <strong>{label}</strong>
      <input type="checkbox" defaultChecked={isToggled} onClick={handleClick} />
      <span />
    </label>
  );
}

export default Toggle;
