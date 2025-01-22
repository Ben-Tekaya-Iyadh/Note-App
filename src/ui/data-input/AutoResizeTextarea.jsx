import { useEffect, useRef, useState } from "react";

import classes from "./AutoResizeTextarea.module.css";

function AutoResizeTextarea({ content = "", changeHandler, name, ...props }) {
  const textareaRef = useRef();

  function autoResize() {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function handleChange(e) {
    changeHandler(e);
    autoResize();
  }

  useEffect(() => {
    autoResize();
  }, []);

  return (
    <textarea
      {...props}
      name={name}
      className={classes.textarea}
      ref={textareaRef}
      value={content}
      onChange={handleChange}
    />
  );
}

export default AutoResizeTextarea;
