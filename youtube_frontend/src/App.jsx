import { useState } from "react";
import { CreateVideo } from "./componentsCollection";
import {useForm} from "react-hook-form"
import axios from "axios";
import {useSelector} from "react-redux"
function App() {
  const authStatus=useSelector(state=>state.auth.authStatus)

  return (
    <>
      {authStatus === false ? <h1>hello</h1>:<h1>bi</h1>}
    </>
  )
}

export default App;
