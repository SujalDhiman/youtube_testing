import { Home } from "./componentsCollection";

function App() {
  const authStatus=useSelector(state=>state.auth.authStatus)

  return (
    <>
      <Home />
    </>
  );
}

export default App;
