import { XCircle, Paperclip } from "@phosphor-icons/react";
import classes from "./ImagePicker.module.css";
import { useRef, useState } from "react";
import { convertImg } from "../../util/helpers";
import ImagePreview from "../ImagePreview";
import useTheme from "../../hooks/useTheme";

function ImagePicker({
  title,
  initial = { url: null, fileName: null },
  handler,
  ...props
}) {
  const [image, setImage] = useState(initial);
  const { darkMode } = useTheme();
  const pickerRef = useRef();

  function onChangeHandler() {
    //convert the selected image data:base64
    convertImg(pickerRef.current.files[0], (res) => {
      setImage(res);
      handler && handler(res);
    });
  }

  function onClickHandler() {
    pickerRef.current.click();
  }

  function onDeleteHandler() {
    handler({ url: null, fileName: null });
    setImage({ url: null, fileName: null });
  }

  return (
    <div className={classes.input + " " + (darkMode ? classes.dark : "")}>
      {title && <label htmlFor={title}>{title} :</label>}
      <input
        onChange={onChangeHandler}
        ref={pickerRef}
        type="file"
        {...props}
        id={title}
        accept="image/png, image/jpeg"
        hidden
      />

      {image?.url ? (
        <ImagePreview
          src={image.url}
          fileName={image.fileName}
          onDelete={onDeleteHandler}
        />
      ) : (
        <button
          type="button"
          className={classes.img_btn}
          onClick={onClickHandler}
        >
          <Paperclip size={32} color="#b5b5b5" weight="duotone" />
          Add Photo
        </button>
      )}
    </div>
  );
}

export default ImagePicker;
