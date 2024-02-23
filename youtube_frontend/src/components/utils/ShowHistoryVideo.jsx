import { useState } from "react";
import { Link } from "react-router-dom";

export function ShowHistoryVideo({ Videodata }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const deleteParticularVideoHistory = (videoDeleteId) => {
    console.log(videoDeleteId);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="mb-4 border-2 border-white rounded-lg flex lg:flex-row">
        <Link to={`/getParticularVideo/${Videodata._id}`}>
          <div className="">
            <img
              src={Videodata.thumbnail.secure_url}
              className="rounded-lg"
              alt="Thumbnail"
            />
          </div>
        <div className="flex flex-row">
        <div className="w-full lg:w-3/6 p-4 flex lg:justify-between">
          <div className="flex justify-between">
            <h3 className="text-sm mt-2 text-white font-bold break-words">
              {Videodata.title}
            </h3>
            
          </div>
          <p className="text-white">Channel Name</p>
          <div className="flex">
            <p className="text-white">{2} views</p>
            <p className="text-white ml-4 flex text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dot h-full"
                viewBox="0 0 16 16"
              >
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              </svg>
              {1} days ago
            </p>
          </div>
        </div>
        </div>
        </Link>
        <div>
              <svg
                onClick={toggleDropdown}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-three-dots-vertical cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#1d1d1d] text-white border-2 border-white rounded-lg hover:bg-red-700">
                  <ul className="py-1">
                    <li className="cursor-pointer px-4 py-2" onClick={()=>deleteParticularVideoHistory(Videodata._id)}>Delete</li>
                  </ul>
                </div>
              )}
            </div>
        </div>
  );
}
