import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Profile, ShowVideo } from "../../componentsCollection";
import { useEffect, useState } from "react";
import { URL } from "../../endpoints";
import axios from "axios";
import { loginUser } from "../../reduxtoolkit/authSlice";
import { useMediaQuery } from "react-responsive";
import { MobileSidebar } from "../utils/MobileSidebar";
import { MobileSearch } from "../utils/MobileSearch";
import { MobileNavigation } from "../utils/MobileNavigation";

export default function Home() {
  const [video, setVideos] = useState([]); //Intiallise all video
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.userStatus);
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  async function loadUserDetails() {
    const user_id = localStorage.getItem("user-id");

    if (user_id === null) return setUserData(null);
    const response = await axios.get(`${URL}/users/getInstantUser/${user_id}`, {
      withCredentials: true,
    });
    console.log(response);
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
        <header className="bg-[#1d1d1d] text-white p-4 fixed top-0 left-0 right-0 border-b-2 border-b-white">
          <div className={`flex items-center justify-between`}>
            <div className="flex items-center">
              <img src="/path/to/your/logo.png" alt="Logo" className="mr-4" />
            </div>
            <div className="flex">
              {!isTabletOrMobile ? (
                <>
                  <div className="relative pr-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none "
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search"
                      size={38}
                      className="bg-[#1d1d1d] text-white p-2 pl-10 rounded border-white border-2"
                    />
                  </div>
                </>
              ) : (
                <div className="pr-8">
                  <MobileSearch />
                </div>
              )}

              {!authStatus && userData === null ? (
                !isTabletOrMobile ? (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-three-dots-vertical mx-8"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                    <button className="text-white mr-4" onClick={login}>
                      Login
                    </button>
                    <button
                      className="bg-[#AE7AFF] text-black px-4 py-2 rounded font-bold "
                      onClick={signUp}
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <MobileNavigation />
                )
              ) : (
                <div className="flex items-center ">
                  <button
                    onClick={() => {
                      navigate("/upload");
                    }}
                    className="w-6 bg-white rounded-full text-red-500 mr-4"
                  >
                    +
                  </button>
                  {userData === null ? "" : <Profile userData={userData} />}
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="flex flex-1 mt-[75px]">
          {!isTabletOrMobile ? (
            <aside className=" w-1/5 sm:w-1/5 lg:w-1/5 xl:w-1/5 bg-[#1d1d1d] text-white py-2 border-r-white border-r-2 fixed min-h-full">
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
                    <li className="mb-4 flex items-center border border-white m-2 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-house"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                      </svg>
                      <p className="ml-3">Home</p>
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
                    <li className="mb-4 flex items-center border border-white m-2 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-hand-thumbs-up"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                      </svg>
                      <p className="ml-3">Liked Videos</p>
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
                    <li className="mb-4 flex items-center border border-white m-2 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-clock-history"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                      </svg>
                      <p className="ml-3">History</p>
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
                    <li className="mb-4 flex items-center border border-white m-2 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-video3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2" />
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z" />
                      </svg>
                      <p className="ml-3">My Channel</p>
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
                    <li className="mb-4 flex items-center border border-white m-2 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-folder2-open"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z" />
                      </svg>
                      <p className="ml-3">PlayList</p>
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
                    <li className="mb-4 flex items-center border border-white m-2 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                      </svg>
                      <p className="ml-3">Subscribers</p>
                    </li>
                  </NavLink>
                  <NavLink
                    to="/support"
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
                    <li className="mb-4 flex items-center border border-white m-2 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-info-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                      </svg>
                      <p className="ml-3">Support</p>
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
                    <li className="mb-4 flex items-center border border-white m-2 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-gear"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                      </svg>
                      <p className="ml-3">Settings</p>
                    </li>
                  </NavLink>
                </ul>
              </nav>
            </aside>
          ) : (
            <MobileSidebar />
          )}
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
              <main className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 overflow-auto bg-[#1d1d1d] ml-0 lg:ml-[20%]">
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
