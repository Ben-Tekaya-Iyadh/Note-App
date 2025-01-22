import { DotsThreeOutline } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";
import classes from "./sideBar.module.css";
import Dropdown from "./DropDown";
import DropdownItem from "./DropdownItem";
import Toggle from "../../../ui/Toggle";
import useTheme from "../../../hooks/useTheme";
import { useDispatch } from "react-redux";
import { startSelection } from "../../../lib/features/selectionSlice";
import { AnimatePresence } from "motion/react";

function SideBar({ size, color }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const sideRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClikcOutside(e) {
      if (sideRef.current && !sideRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClikcOutside);

    return () => {
      document.removeEventListener("click", handleClikcOutside);
    };
  }, [isOpen, setIsOpen]);

  function handleSelect() {
    dispatch(startSelection());
    setIsOpen(false);
  }

  return (
    <div className={classes.side_bar} ref={sideRef}>
      <button
        className={isOpen ? classes.open : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <DotsThreeOutline
          size={size}
          weight="bold"
          color={color}
          style={{ padding: "15px" }}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <Dropdown
            style={{
              fontWeight: "bold",
              paddingLeft: "30px",
            }}
          >
            <DropdownItem>
              <Toggle
                label={darkMode ? "Dark Mode" : "Light Mode"}
                toggled={false}
                onToggle={toggleDarkMode}
              />
            </DropdownItem>

            <DropdownItem onClick={handleSelect}>Select</DropdownItem>
            <DropdownItem link="/deleted">Recently Deleted</DropdownItem>
          </Dropdown>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SideBar;
