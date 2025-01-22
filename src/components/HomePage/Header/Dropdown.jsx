import React from "react";
import classes from "./Dropdown.module.css";
import useTheme from "../../../hooks/useTheme";
import { motion } from "motion/react";

function Dropdown({ children, ...props }) {
  const { darkMode } = useTheme();
  return (
      <motion.div
        initial={{ opacity: 0,  scale: 0.8, x: 30, y: -30 }}
        animate={{ opacity: 1,  scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0,  scale: 0.8, x: 30, y: -30 }}
        transition={{ duration: 0.2,  ease: 'easeOut', }}
        {...props}
        className={classes.dropdown + " " + (darkMode ? classes.dark : "")}
      >
        {children}
      </motion.div>
  );
}

export default Dropdown;
