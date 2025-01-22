import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DetailsHeader from "../components/NoteDetailPage/DetailsHeader";
import Note from "../components/NoteDetailPage/Note";
import Body from "../ui/page-components/Body";

import classes from "./NoteDetailsPage.module.css"
import { fetchData } from "../util/fetcher";
import { getDate } from "../util/helpers";

function NoteDetails() {
  const data = useLoaderData();
  const [isChanged, setIsChanged] = useState(false);
  const [noteData, setNoteData] = useState(data);
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNoteData((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  }

  function handleImageUpload({ url, fileName }) {
    setNoteData((prev) => ({ ...prev, attachement: { url, fileName } }));
    setIsChanged(true);
  }

  async function handleDelete() {
    //send DELETE request to delete note
    const resp = await fetchData("notes", "DELETE", {deleteList: [data._id]})
    navigate("/");
  }

  async function handleSave() {
    //send PUT request to save changes
    const resp = await fetchData("notes", "PUT", {...noteData, lastModified: getDate()})
    navigate("/");
  }

  return (
    <div className={classes.details_page}>
      <DetailsHeader changed={isChanged} save={handleSave} />
      <Body>
        <Note
          onInputChange={handleInputChange}
          onImageUpload={handleImageUpload}
          onNoteDelete={handleDelete}
          data={noteData}
        />
      </Body>
    </div>
  );
}

export default NoteDetails;

export async function loader({ params }) {
  const id = params.noteId;
  const route = `notes/${id}`;
  console.log(id)
  const data = await fetchData(route);

  return data
}
