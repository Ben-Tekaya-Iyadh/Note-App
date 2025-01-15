import { useDispatch, useSelector } from "react-redux";
import classes from "./NoteItem.module.css";
import { Link } from "react-router-dom";
import { IsLightColor } from "../../../util/helpers";
import { CheckCircle, Circle } from "@phosphor-icons/react";
import { addSelection } from "../../../lib/features/selectionSlice";
import { motion } from "motion/react";
import { memo } from "react";

function NoteItem({ data, readonly, index }) {
  const dispatch = useDispatch();
  const { galery } = useSelector((state) => state.display);
  const { isSelecting, selectedItems } = useSelector(
    (state) => state.selection
  );

  const isLink = !isSelecting && !readonly;
  const light = IsLightColor(data.color);

  const itemClasses =
    classes.note_item +
    " " +
    (galery ? classes.galery_mode : classes.list_mode);

  const content = (
    <>
      {isSelecting && (
        <SelectCircle
          isLight={light}
          isSelected={selectedItems.includes(data.id)}
        />
      )}
      <h2 className={classes.title}>{data.title}</h2>
      {data.description && (
        <p className={classes.description}>{data.description}</p>
      )}
      <p className={classes.date}>{data.lastModified}</p>
      {!galery && data.content.length > 0 && (
        <div className={classes.body}>
          <p>{data.content}</p>
        </div>
      )}
    </>
  );

  return (
    <motion.div
      className={itemClasses}
      initial={{ opacity: 0, x: -10 }} // Start from left, faded
      animate={{
        opacity: 1,
        x: 0, // Animate to normal position
        transition: {
          delay: index * 0.1,
          duration: 0.2,
          ease: "easeInOut",
        },
      }}
      exit={{ opacity: 0, x: 10 }} // Fade out and move up on removal
    >
      <Wrapper
        onSelect={() => dispatch(addSelection(data.id))}
        data={data}
        isLink={isLink}
        isSelecting={isSelecting}
        light={light}
      >
        {content}
      </Wrapper>
    </motion.div>
  );
}

export default NoteItem;

function Wrapper({ children, data, isLink, isSelecting, light, onSelect }) {
  return (
    <>
      {isLink ? (
        <Link
          className={classes.item_content}
          style={{
            display: "block",
            backgroundColor: `${data.color}`,
            color: `${!light ? "rgb(230, 230, 230)" : "black"}`,
          }}
          to={`${data.id}`}
        >
          {children}
        </Link>
      ) : (
        <div
          className={classes.item_content}
          style={{
            backgroundColor: `${data.color}`,
            color: `${!light ? "rgb(230, 230, 230)" : "black"}`,
          }}
          onClick={() => {
            isSelecting && onSelect();
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}

const SelectCircle = memo(function SelectCircle({ isSelected, isLight }) {
  return (
    <>
      {isSelected ? (
        <motion.div>
          <CheckCircle
            size={32}
            color={isLight ? "#514343" : "rgb(230, 230, 230)"}
            weight={"fill"}
            className={classes.selection}
          />
        </motion.div>
      ) : (
        <Circle
          size={32}
          color={isLight ? "#514343" : "rgb(230, 230, 230)"}
          weight={"light"}
          className={classes.selection}
        />
      )}
    </>
  );
});
