import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import classes from "./SearchBar.module.css";
//import useSearch from "../../../hooks/useSearch";
import { SearchContext } from "../../../lib/SearchContext";

const SearchBar = function ({ size, color, def }) {
  const [isVisible, setIsVisible] = useState(def);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const searchRef = useRef();
  const iconRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (!isVisible || def) {
      return;
    }

    function handleClikcOutside(e) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        !iconRef.current.contains(e.target)
      ) {
        setIsVisible(false);
      }
    }

    document.addEventListener("click", handleClikcOutside);

    return () => {
      document.removeEventListener("click", handleClikcOutside);
    };
  }, [isVisible, setIsVisible]);


  return (
    <div style={{position: "relative"}}>
      <label htmlFor="search">
        <div
          ref={iconRef}
          className={classes.icon}
          onClick={() => {
            setIsVisible(true);
          }}
        >
          <MagnifyingGlass
            weight="bold"
            size={size}
            color={color}
          />
        </div>
      </label>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isVisible ? "300px" : 0,
              opacity: 1
            }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={searchRef}
            className={classes.search_bar + " " + classes.active}
          >
            <div>
              <input
                ref={inputRef}
                placeholder="Search"
                type="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ color: `${color}` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
