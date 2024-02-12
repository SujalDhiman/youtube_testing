import { useState } from "react";

export function MobileSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      {/* Search icon */}
      <button
        className="inset-0 bg-white rounded-full w-12 h-12 flex justify-center items-center"
        onClick={toggleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search text-black pointer-events-none"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>

      {/* Search component */}
      {isSearchOpen && (
        <div className="inset-0 absolute">
          <div className="bg-[#1d1d1d] h-screen w-screen">
            <div className="p-10">
              {/* Back arrow */}
              <button
                onClick={toggleSearch}
                className=" top-4 left-4 bg-red-700 text-white py-2 px-4 rounded-full hover:bg-red-600 h-16 w-16 flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-arrow-left-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
              </button>
              <div className="flex flex-wrap mt-10">
                <h1 className="text-2xl font-bold mb-4 text-white">Search</h1>
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 p-2 mb-4 w-full text-black"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
