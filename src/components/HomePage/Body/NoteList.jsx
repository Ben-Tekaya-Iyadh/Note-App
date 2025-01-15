import { useSelector } from "react-redux";
import classes from "./NoteList.module.css";
import NoteItem from "./NoteItem";
import { useContext, useMemo } from "react";
import { SearchContext } from "../../../lib/SearchContext";
import { useLoaderData } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { sortData } from "../../../util/helpers";

const NoteList = function ({ readonly }) {
  const data = useLoaderData();

  const { galery } = useSelector((state) => state.display);
  const { searchTerm } = useContext(SearchContext);
  console.log("render list");

  const searchResults = useMemo(
    () =>
      sortData(false, data).filter((note) => {
        return JSON.stringify(note)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }),
    [data, searchTerm]
  );

  return (
    <>
      {
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={galery ? classes.galery : classes.list}
        >
          <AnimatePresence>
            {searchResults.map((note, index) => {
              return (
                <NoteItem
                  data={note}
                  index={index}
                  key={note.id}
                  readonly={readonly}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      }
    </>
  );
};

export default NoteList;
