import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { forwardRef } from "react";

const Modal = forwardRef (function ({ children }, ref) {

  return createPortal(
    <dialog ref={ref} className={classes.modal}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
