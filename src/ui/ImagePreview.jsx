import classes from "./ImagePreview.module.css";
import { Paperclip, XCircle } from "@phosphor-icons/react";

function ImagePreview({ src, fileName, onDelete }) {
  return (
    <div className={classes.container}>
      {fileName && (
        <div className={classes.fileName}>
          <span>
            <Paperclip size={32} color="#514343" weight="duotone" />
            {fileName}
          </span>
          <span onClick={onDelete}>
            <XCircle size={32} />
          </span>
        </div>
      )}{" "}
      <img src={src} />
    </div>
  );
}

export default ImagePreview;
