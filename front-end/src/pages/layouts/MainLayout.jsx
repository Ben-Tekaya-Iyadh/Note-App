import { Outlet, useNavigation } from "react-router-dom";
import Loading from "../../ui/Loading";

function MainLayout() {
  const navigation =  useNavigation();

  return (
    <>
        {navigation.state ==="loading" ? <Loading/> : <Outlet />}
    </>
  );
}

export default MainLayout;
