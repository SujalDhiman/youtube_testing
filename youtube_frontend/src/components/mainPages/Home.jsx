import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../componentsCollection";
import { useEffect, useState } from "react";
import { URL } from "../../endpoints";
import axios from "axios";
import { loginUser } from "../../reduxtoolkit/authSlice";
import { Modal } from "../utils/Modal";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.userStatus);
  const dispatch = useDispatch();

  console.log(authStatus);

  async function loadUserDetails() {
    const user_id = localStorage.getItem("user-id");

    if (user_id === null) return setUserData(null);
    const response = await axios.get(`${URL}/users/getInstantUser/${user_id}`, {
      withCredentials: true,
    });

    dispatch(loginUser(response.data.data));
    setUserData(response.data.data);
  }

  useEffect(() => {
    loadUserDetails();
  }, [authStatus]);

  function signUp() {
    navigate("/signUp");
  }

  function login() {
    navigate("/login");
  }

  return (
    // <div className="flex flex-col h-screen">
    //   <header className="bg-black text-white p-4">
    //     <div className="flex items-center justify-between">
    //       <div className="flex items-center">
    //         <img src="/path/to/your/logo.png" alt="Logo" className="mr-4" />
    //         <input
    //           type="text"
    //           placeholder="Search"
    //           className="bg-gray-700 text-white p-2 rounded"
    //         />
    //       </div>
    //       {!authStatus && userData === null ? (
    //         <div className="flex items-center">
    //           <button className="text-white mr-4" onClick={login}>
    //             Login
    //           </button>
    //           <button
    //             className="bg-blue-500 text-white px-4 py-2 rounded"
    //             onClick={signUp}
    //           >
    //             Sign Up
    //           </button>{" "}
    //         </div>
    //       ) : (
    //         <>
    //           <LogoutUser />
    //         </>
    //       )}
    //     </div>
    //   </header>
    //   <div className="flex flex-1">
    //     <aside className="w-1/4 bg-black text-white p-4">
    //       <nav>
    //         <ul>
    //           <li className="mb-4">
    //             <NavLink to="/" className="flex items-center">
    //               <i className="fas fa-home mr-2"></i> Home
    //             </NavLink>
    //           </li>
    //           <li className="mb-4">
    //             <NavLink to="/liked" className="flex items-center">
    //               <i className="fas fa-thumbs-up mr-2"></i> Liked Videos
    //             </NavLink>
    //           </li>
    //           <li className="mb-4">
    //             <NavLink to="/history" className="flex items-center">
    //               <i className="fas fa-history mr-2"></i> History
    //             </NavLink>
    //           </li>
    //           <li className="mb-4">
    //             <NavLink to="/mycontent" className="flex items-center">
    //               <i className="fas fa-file-alt mr-2"></i> My Content
    //             </NavLink>
    //           </li>
    //           <li className="mb-4">
    //             <NavLink to="/collection" className="flex items-center">
    //               <i className="fas fa-folder mr-2"></i> Collection
    //             </NavLink>
    //           </li>
    //           <li className="mb-4">
    //             <NavLink to="/subscribers" className="flex items-center">
    //               <i className="fas fa-users mr-2"></i> Subscribers
    //             </NavLink>
    //           </li>
    //           <li className="mt-auto">
    //             <NavLink to="/settings" className="flex items-center">
    //               <i className="fas fa-cog mr-2"></i> Settings
    //             </NavLink>
    //           </li>
    //         </ul>
    //       </nav>
    //     </aside>
    //     <main className="flex-1 bg-white p-4 flex items-center justify-center">
    //       <div className="text-center">
    //         <h2 className="text-3xl mb-4">No Video To show</h2>
    //         <p className="text-gray-600">
    //           Explore and enjoy your content here!
    //         </p>
    //       </div>
    //     </main>
    //   </div>
    // </div>
    <Modal />
  );
}
