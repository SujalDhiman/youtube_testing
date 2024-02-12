import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

export function MobileNavigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to handle click outside of dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    // Add event listener to the document body
    document.body.addEventListener("click", handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        className="w-12 h-12 rounded-full cursor-pointer"
        src="https://source.unsplash.com/random"
        alt="user"
        onClick={handleDropdownClick}
      />
      {/* Dropdown box */}
      {showDropdown && (
        <div className="absolute z-10 w-36 bg-black  border-white rounded-md shadow-lg mt-2 py-2 right-0 border">
          {/* Navigation links */}
          <NavLink
            to="/profile"
            className="block px-4 py-2 text-white border-b-2"
            onClick={() => setShowDropdown(false)}
          >
            Profile
          </NavLink>
          <NavLink
            to="/settings"
            className="block px-4 py-2 text-white border-b-2"
            onClick={() => setShowDropdown(false)}
          >
            Settings
          </NavLink>
          <NavLink
            to="/logout"
            className="block px-4 py-2 text-white"
            onClick={() => setShowDropdown(false)}
          >
            Logout
          </NavLink>
        </div>
      )}
    </div>
  );
}
