import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {LogoutUser} from "../../componentsCollection"
import { useEffect, useState } from "react";
import { URL } from "../../endpoints";
import axios from "axios";
import { loginUser } from "../../reduxtoolkit/authSlice";


export default function Home() {

  const [userData,setUserData]=useState(null)
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.userStatus);
  const dispatch=useDispatch()

  console.log(authStatus)

  async function loadUserDetails()
  {
      const user_id=localStorage.getItem("user-id")

      if(user_id === null) return setUserData(null)
      const response=await axios.get(`${URL}/users/getInstantUser/${user_id}`,{
        withCredentials:true
      })

      dispatch(loginUser(response.data.data))
      setUserData(response.data.data)
      
  }

  useEffect(()=>{
    loadUserDetails()
  },[authStatus])


  function signUp() {
    navigate("/signUp");
  }

  function login() {
    navigate("/login");
  }

  return (
    <nav>
      {!authStatus && userData === null ? (
        <>
          <button onClick={signUp}>SignUp</button>
          <button onClick={login}>Login</button>
        </>
      ) : (
        <LogoutUser />
      )}
    </nav>
  );
}
