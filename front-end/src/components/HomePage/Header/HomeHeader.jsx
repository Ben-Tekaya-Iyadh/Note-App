import Header from "../../../ui/page-components/Header";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import useTheme from "../../../hooks/useTheme";
import { useSelector } from "react-redux";
import SelectionMenu from "../../../ui/SelectionMenu";
import { AnimatePresence, motion } from "motion/react";

function HomeHeader() {
  const { darkMode } = useTheme();
  const { isSelecting } = useSelector((state) => state.selection);
  const mySize = 30;
  const iconColor = darkMode ? "#b6b6b6" : "#9a9bbc";

  return (
    <Header>
      <AnimatePresence mode="wait">
        <motion.div
          key={isSelecting} // Key based on the selection state to trigger re-animation
          initial={{ opacity: 0, rotateX: 90 }} // Start with a 90 degree rotation
          animate={{ opacity: 1, rotateX: 0 }} // Rotate to 0 degrees (front)
          exit={{ opacity: 0, rotateX: -90 }} // Rotate to -90 degrees (back)
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3, // Duration of the flip animation
          }}
          style={{ width: "100%" }}
        >
          {isSelecting ? (
            <motion.div
              key="selection" // Key for the SelectionMenu to animate independently
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: -90 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
                duration: 0.3,
              }}
              style={{ width: "100%" }}
            >
              <SelectionMenu size={mySize} color={iconColor} />
            </motion.div>
          ) : (
            <motion.div
              key="sidebar" // Key for the SideBar to animate independently
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: -90 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SearchBar size={mySize} color={iconColor} />
              <SideBar size={mySize} color={iconColor} />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </Header>
  );
}

export default HomeHeader;
