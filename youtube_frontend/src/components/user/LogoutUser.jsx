import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../reduxtoolkit/authSlice"
import axios from "axios"
import { URL } from "../../endpoints"

export default function LogoutUser()
{
    let dispatch=useDispatch()
    async function logoutCurrentUser()
    {
        const response=await axios.get(`${URL}/users/logout`,{
           withCredentials:true
        })
        console.log(response)
        dispatch(logoutUser())
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user-id")
    }
    return (<button onClick={logoutCurrentUser}>Logout</button>)
}