import { useState } from "react";
import classes from "./ColorPicker.module.css";
import { IsLightColor } from "../../util/helpers";
import useTheme from "../../hooks/useTheme";

function ColorPickerStd({
  label,
  name,
  initColor = "#FFFFFF",
  height,
  width,
  fontSize,
  handler,
  style,
}) {
  const { darkMode } = useTheme();
  const [color, setColor] = useState(initColor);

  const isLight = IsLightColor(color);

  return (
    <div className={classes.container} style={style}>
      {label && (
        <label htmlFor={label} style={{ color: darkMode && "rgb(230, 230, 230)" }}>
          {label} :
        </label>
      )}
      <div className={classes.picker}>
        <input
          style={{
            height,
            width,
            border: (!isLight ? "rgb(230, 230, 230)" : "black") + " solid 1px",
          }}
          aria-label="Icon Color"
          type="color"
          value={color}
          name={name}
          id={label}
          onChange={(e) => {
            handler && handler(e);
            setColor(e.target.value);
          }}
        />
        <span
          style={{
            color: isLight ? "black" : "rgb(230, 230, 230)",
            fontSize,
          }}
        >
          {color}
        </span>
      </div>
    </div>
  );
}

export default ColorPickerStd;
