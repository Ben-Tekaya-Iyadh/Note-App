import classes from "./NewNotePage.module.css";

import NewNoteHeader from "../components/NewNotePage/NewNoteHeader";
import NoteForm from "../components/NewNotePage/NoteForm";
import Footer from "../components/NewNotePage/Footer";

import Body from "../ui/page-components/Body";
import { useRef } from "react";
import FormActions from "../ui/FormActions";
import { useNavigate } from "react-router-dom";
import { getDate } from "../util/helpers";
import { fetchData } from "../util/fetcher";

function NewNotePage() {
  const formRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("..submitting");
    const formData = new FormData(formRef.current);
    const date = getDate();
    console.log(date)

    const obj = {
      title: formData.get("title"),
      description: formData.get("description"),
      color: formData.get("color"),
      attachement: {
        url: formData.get("url"),
        fileName: formData.get("attachement").name,
      },
      creationDate: date,
      lastModified: date,
    };

    const response = await fetchData("notes/new", "POST", obj);
    navigate("/");
  }

  return (
    <div className={classes.new_note_page}>
      <NewNoteHeader title="NewNote" />
      <Body>
        <NoteForm ref={formRef} onSubmit={handleSubmit} action="" />
      </Body>
      <Footer>
        <FormActions submitHandler={() => formRef.current.requestSubmit()} />
      </Footer>
    </div>
  );
}

export default NewNotePage;

function action({ request }) {
  console.log(request);
}
