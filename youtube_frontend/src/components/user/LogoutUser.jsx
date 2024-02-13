import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reduxtoolkit/authSlice";
import axios from "axios";
import { URL } from "../../endpoints";
import { useState } from "react";

export default function Profile({ userData }) {
  const [toggleOption, setToggleOption] = useState(false);
  let dispatch = useDispatch();
  const toggleMenu = () => {
    setToggleOption((prevState) => !prevState);
  };

  async function logoutCurrentUser() {
    const response = await axios.get(`${URL}/users/logout`, {
      withCredentials: true,
    });
    console.log(response);
    dispatch(logoutUser());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user-id");
  }

  return (
    <div className="relative">
      <img
        src={userData.avatar.url}
        alt="userProfile"
        className="h-10 w-10 rounded-full cursor-pointer"
        onClick={toggleMenu}
      />
      {toggleOption && (
        <div className="absolute top-12 right-0 mt-2 w-32 rounded-lg shadow-lg bg-[#1d1d1d] border border-gray-200">
          <ul>
            <li
              className="py-2 px-4 hover:bg-gray-800 cursor-pointer"
              onClick={logoutCurrentUser}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

//Previos
// export default function LogoutUser()
// {
//     let dispatch=useDispatch()
//     async function logoutCurrentUser()
//     {
//         const response=await axios.get(`${URL}/users/logout`,{
//            withCredentials:true
//         })
//         console.log(response)
//         dispatch(logoutUser())
//         localStorage.removeItem("accessToken")
//         localStorage.removeItem("user-id")
//     }
//     return (<button onClick={logoutCurrentUser}>Logout</button>)
// }
