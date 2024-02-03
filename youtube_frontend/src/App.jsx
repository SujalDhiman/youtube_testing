import { Outlet } from "react-router";
import { Home } from "./componentsCollection";
import { useSelector } from "react-redux";

function App() {
  const authStatus=useSelector(state=>state.auth.authStatus)

  return (
    <>
      
      <Outlet />
    </>
  );
}

export default App;
