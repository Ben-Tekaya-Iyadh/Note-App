import { useSelector } from "react-redux";
import classes from "./NoteList.module.css";
import NoteItem from "./NoteItem";
import { useContext, useEffect, useMemo, useState } from "react";
import { SearchContext } from "../../../lib/SearchContext";
import { useFetcher, useLoaderData } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { sortData } from "../../../util/helpers";
import { fetchData } from "../../../util/fetcher";

const NoteList = function ({ readonly }) {
  const [data, setData] = useState(useLoaderData());
  const { galery } = useSelector((state) => state.display);
  const { searchTerm } = useContext(SearchContext);


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
      {data.length === 0 ? (
        <p className={classes.fallback}>No Items!</p>
      ) : (
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
                  key={note._id}
                  readonly={readonly}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
};

export default NoteList;
