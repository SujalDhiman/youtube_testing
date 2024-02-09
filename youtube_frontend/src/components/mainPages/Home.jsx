import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutUser, ShowVideo } from "../../componentsCollection";
import { useEffect, useState } from "react";
import { URL } from "../../endpoints";
import axios from "axios";
import { loginUser } from "../../reduxtoolkit/authSlice";

export default function Home() {
  const [video, setVideos] = useState([]); //Intiallise all video
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.userStatus);
  const dispatch = useDispatch();

  async function loadUserDetails() {
    const user_id = localStorage.getItem("user-id");

    if (user_id === null) return setUserData(null);
    const response = await axios.get(`${URL}/users/getInstantUser/${user_id}`, {
      withCredentials: true,
    });

    dispatch(loginUser(response.data.data));
    setUserData(response.data.data);
  }

  //Function to get AllVideos from Backened
  async function getVideos() {
    const res = await axios.get(`${URL}/video/getAllVideo`, {
      withCredentials: true,
    });
    console.log(res.data.data);
    setVideos(res.data.data);
  }

  //Login Status Remember
  useEffect(() => {
    loadUserDetails();
  }, [authStatus]);

  // To get videos at starting of page loading
  useEffect(() => {
    getVideos();
  }, []);

  function signUp() {
    navigate("/signUp");
  }

  function login() {
    navigate("/login");
  }

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="bg-black text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/path/to/your/logo.png" alt="Logo" className="mr-4" />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-700 text-white p-2 rounded"
              />
            </div>
            {!authStatus && userData === null ? (
              <div className="flex items-center">
                <button className="text-white mr-4" onClick={login}>
                  Login
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={signUp}
                >
                  Sign Up
                </button>{" "}
              </div>
            ) : (
              <div className="flex items-center ">
                <button
                  onClick={() => {
                    navigate("/modal");
                  }}
                  className="w-6 bg-white rounded-full text-red-500 mr-4"
                >
                  +
                </button>
                <LogoutUser />
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="w-1/4 bg-black text-white py-2">
            <nav>
              <ul>
                <NavLink
                  to="/Home"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  style={({ isActive }) => {
                    return {
                      background: isActive ? "white" : "pink",
                      color: isActive ? "red" : "yellow",
                    };
                  }}
                >
                  <li className="mb-4 w-full">
                    <i className="fas fa-home mr-2"></i> Home
                  </li>
                </NavLink>
                <NavLink
                  to="/likedVideos"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red" : "yellow",
                      backgroundColor: isActive ? "white" : "",
                    };
                  }}
                >
                  <li className="mb-4">
                    <i className="fas fa-thumbs-up mr-2"></i> Liked Videos
                  </li>
                </NavLink>
                <NavLink
                  to="/history"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red" : "yellow",
                      backgroundColor: isActive ? "white" : "",
                    };
                  }}
                >
                  <li className="mb-4">
                    <i className="fas fa-history mr-2"></i> History
                  </li>
                </NavLink>
                <NavLink
                  to="/myChannel"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red" : "yellow",
                      backgroundColor: isActive ? "white" : "",
                    };
                  }}
                >
                  <li className="mb-4">
                    <i className="fas fa-file-alt mr-2"></i> My Channel
                  </li>
                </NavLink>
                <NavLink
                  to="/PlayList"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red" : "yellow",
                      backgroundColor: isActive ? "white" : "",
                    };
                  }}
                >
                  <li className="mb-4">
                    <i className="fas fa-folder mr-2"></i> PlayList
                  </li>
                </NavLink>
                <NavLink
                  to="/subscribers"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red" : "yellow",
                      backgroundColor: isActive ? "white" : "",
                    };
                  }}
                >
                  <li className="mb-4">
                    <i className="fas fa-users mr-2"></i> Subscribers
                  </li>
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red" : "yellow",
                      backgroundColor: isActive ? "white" : "",
                    };
                  }}
                >
                  <li className="mt-auto">
                    <i className="fas fa-cog mr-2"></i> Settings
                  </li>
                </NavLink>
              </ul>
            </nav>
          </aside>
          <>
            {!video.length ? (
              <main className="flex-1 bg-white p-4 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl mb-4">No Video To show</h2>
                  <p className="text-gray-600">
                    Explore and enjoy your content here!{video.length}
                  </p>
                </div>
              </main>
            ) : (
              <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {video.map((el) => (
                  <ShowVideo key={el._id} video={el} className="w-full" />
                ))}
              </main>
            )}
          </>
        </div>
      </div>
    </>
  );
}

//className="flex items-center rounded-lg "

<li className="mb-4 w-full">
  <div
    style={({ isActive }) => ({
      backgroundColor: isActive ? "gray" : "", // Set your desired background color
    })}
  >
    <NavLink
      to="/Home"
      style={({ isActive }) => ({
        color: isActive ? "red" : "yellow",
      })}
    >
      <i className="fas fa-home mr-2"></i> Home
    </NavLink>
  </div>
</li>;
