import { useLoaderData, useNavigation } from "react-router-dom";
import DeletedHeader from "../components/DeletedPage/Header/DeletedHeader";
import Body from "../ui/page-components/Body";
import { fetchData } from "../util/fetcher";

import classes from "./DeletePage.module.css";
import NoteList from "../components/HomePage/Body/NoteList";
import SearchBar from "../components/HomePage/Header/SearchBar";
import SearchProvider from "../lib/SearchContext";

function DeletedPage() {

  return (
    <div className={classes.container}>
      <DeletedHeader />
      <SearchProvider>
        <Body>
          <div className={classes.search}>
            <SearchBar def={true} />
          </div>
            <NoteList readonly />
        </Body>
      </SearchProvider>
    </div>
  );
}

export default DeletedPage;

export async function loader() {
  const result = await fetchData("notes/deleted", "GET");
  return result;
}

