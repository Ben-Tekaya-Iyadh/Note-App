import { Form } from "react-router-dom";
import classes from "./NoteForm.module.css";
import Input from "../../ui/data-input/Input";
//import ColorPicker from "../ui/ColorPicker";
import ColorPickerStd from "../../ui/data-input/ColorPickrStd";
import ImagePicker from "../../ui/data-input/ImagePicker";
import { useState } from "react";

function NoteForm({ children, ref, closeHandler, title, ...props }) {
  const [imageUrl, setImageUrl] = useState({url: "", fileName: ""});

  return (
    <Form ref={ref} className={classes.form} {...props} method="POST">
      <div className={classes.form_content}>
        <Input title="Title" name="title" type="text" required />
        <Input title="Description" name="description" type="text" textArea />
        <ColorPickerStd
          label="Pick a color"
          height="60px"
          width="90vw"
          name="color"
        />
        <ImagePicker name="attachement" handler={setImageUrl} title="Attachement" />
        <input type="text" name="url" defaultValue={imageUrl?.url} hidden/>
      </div>
    </Form>
  );
}

export default NoteForm;

export async function action({ request }) {
  const mydata = await request.formData();
  const title = await mydata.get("title")
  console.log(title)
  return {data: null}
}
