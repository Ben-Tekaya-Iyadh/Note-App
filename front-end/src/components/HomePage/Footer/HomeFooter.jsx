import { useSelector, useDispatch } from "react-redux";
import AddBtn from "./AddBtn";
import classes from "./HomeFooter.module.css";
import { Rows, SquaresFour, Funnel } from "@phosphor-icons/react";
import { toggleGalery } from "../../../lib/features/themeSlice";
import useTheme from "../../../hooks/useTheme";
import Footer from "../../../ui/page-components/Footer";

function DisplayBtn({color}) {
  const { galery } = useSelector((state) => state.display);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleGalery())}
      className={classes.normal_button}
      type="button"
    >
      {galery ? (
        <Rows size={32} color={color} weight="bold" />
      ) : (
        <SquaresFour size={32} color={color} weight="bold" />
      )}
    </button>
  );
}



function HomeFooter({sort}) {
  const {darkMode} = useTheme()
  const iconColor = darkMode? "#b6b6b6" : "#9a9bbc";
  return (
    <Footer>
      <DisplayBtn color={iconColor}/>
      <AddBtn dark={darkMode}/>
      <button className={classes.normal_button} onClick={sort}>
        <Funnel size={32} color={iconColor} weight="bold" />
      </button>
    </Footer>
  );
}

export default HomeFooter;
