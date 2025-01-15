import ImagePreview from "../../ui/ImagePreview";
import ColorPickerStd from "../../ui/data-input/ColorPickrStd";
import ImagePicker from "../../ui/data-input/ImagePicker";
import AutoResizeTextarea from "../../ui/data-input/AutoResizeTextarea";
import classes from "./Note.module.css";
import { IsLightColor } from "../../util/helpers";
import { Trash } from "@phosphor-icons/react";

function Note({ onInputChange, onImageUpload, onNoteDelete, data }) {
  const isLight = IsLightColor(data.color);

  return (
    <div className={classes.container} style={{ backgroundColor: data.color }}>
      <ColorPickerStd
        style={{
          padding: "10px",
        }}
        initColor={data.color}
        height="50px"
        width="150px"
        fontSize="20px"
        name="color"
        handler={onInputChange}
      />

      <Trash
        size={40}
        color={!isLight ? "rgb(230, 230, 230)" : "black"}
        className={classes.delete_btn}
        onClick={onNoteDelete}
        weight="duotone"
      />
      <input
        type="text"
        name="title"
        value={data.title}
        className={classes.title}
        onChange={onInputChange}
        style={{ color: !isLight && "rgb(230, 230, 230)" }}
      />
      {data.description && (
        <AutoResizeTextarea
          name="description"
          changeHandler={onInputChange}
          content={data.description}
          style={{ color: !isLight && "rgb(230, 230, 230)" }}
        />
      )}
      <AutoResizeTextarea
        name="content"
        changeHandler={onInputChange}
        content={data.content}
        style={{ color: !isLight && "rgb(230, 230, 230)" }}
      />
      <ImagePicker handler={onImageUpload} initial={data.attachement} />
    </div>
  );
}

export default Note;
