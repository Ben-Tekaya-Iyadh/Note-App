import classes from "./HomePage.module.css";

import HomeFooter from "../components/HomePage/Footer/HomeFooter";
import NoteList from "../components/HomePage/Body/NoteList";
import HomeHeader from "../components/HomePage/Header/HomeHeader";
import Body from "../ui/page-components/Body";
import SearchProvider from "../lib/SearchContext";
import { fetchData } from "../util/fetcher";

function HomePage() {
  return (
    <div className={classes.home_page}>
      <SearchProvider>
        <HomeHeader />
        <Body>
          <NoteList />
        </Body>
      </SearchProvider>
      <HomeFooter />
    </div>
  );
}

export default HomePage;

export async function loader() {
  const response = await fetchData("notes", "GET");
  return response;
}
