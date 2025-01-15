import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function MainLayout() {
  const darkMode = useSelector(state=> state.display.darkMode)
  return (
    <>
      <main className={darkMode ? "dark" : ""}>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
