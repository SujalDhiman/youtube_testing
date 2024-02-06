import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutUser, ShowVideo } from "../../componentsCollection";
import { useEffect, useState } from "react";
import { URL } from "../../endpoints";
import axios from "axios";
import { loginUser } from "../../reduxtoolkit/authSlice";

export default function Home() {

  const [video, setVideo] = useState([]); //Intiallise all video
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
<<<<<<< HEAD
    console.log(res.data.data);
    setVideos(res.data.data);
=======
    console.log(res.data);
    setVideo(res.data.data)
>>>>>>> e73955b32b38ed080f586e13822a58a881d69a0e
  }

  //Login Status Remember
  useEffect(() => {
    loadUserDetails();
  }, [authStatus]);

  //To get videos at starting of page loading
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
              <LogoutUser />
            )}
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="w-1/4 bg-black text-white p-4">
            <nav>
              <ul>
                <li className="mb-4">
                  <NavLink to="/" className="flex items-center">
                    <i className="fas fa-home mr-2"></i> Home
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink to="/liked" className="flex items-center">
                    <i className="fas fa-thumbs-up mr-2"></i> Liked Videos
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink to="/history" className="flex items-center">
                    <i className="fas fa-history mr-2"></i> History
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink to="/mycontent" className="flex items-center">
                    <i className="fas fa-file-alt mr-2"></i> My Content
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink to="/collection" className="flex items-center">
                    <i className="fas fa-folder mr-2"></i> Collection
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink to="/subscribers" className="flex items-center">
                    <i className="fas fa-users mr-2"></i> Subscribers
                  </NavLink>
                </li>
                <li className="mt-auto">
                  <NavLink to="/settings" className="flex items-center">
                    <i className="fas fa-cog mr-2"></i> Settings
                  </NavLink>
                </li>
              </ul>
            </nav>
          </aside>
<<<<<<< HEAD
          <>
            {!videos.length ? (
              <main className="flex-1 bg-white p-4 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl mb-4">No Video To show</h2>
                  <p className="text-gray-600">
                    Explore and enjoy your content here!
                  </p>
                </div>
              </main>
            ) : (
              <main className="flex flex-row justify-evenly items-start gap-7 flex-wrap p-4">
                {videos.map((el) => (
                  <ShowVideo key={el._id} video={el} className="w-full" />
                ))}
              </main>
            )}
          </>
        </div>
=======
          </div>
          {video.length === 0 ? (
            <main className="flex-1 bg-white p-4 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl mb-4">No Video To show</h2>
                <p className="text-gray-600">
                  Explore and enjoy your content here!
                </p>
              </div>
            </main>
          ) : (
            video.map((ele)=><h1>Hello world</h1>)
          )}
>>>>>>> e73955b32b38ed080f586e13822a58a881d69a0e
      </div>
      <button
        onClick={() => {
          navigate("/modal");
        }}
      >
        Modal
      </button>
    </>
  );
}
