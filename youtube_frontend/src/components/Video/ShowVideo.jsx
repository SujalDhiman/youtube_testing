import React from "react";
import { Link } from "react-router-dom";

export function ShowVideo({ video }) {
  const { thumbnail, title, views = 0, userData, createdAt, _id } = video;

  return (
    <Link to={`/getParticularVideo/${_id}`}>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="mb-4">
          <img
            src={thumbnail.secure_url}
            alt="Thumbnail"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center mb-2">
          <img
            src={userData.avatar.url}
            alt="Owner"
            className="w-8 h-8 object-cover rounded-full mr-2"
          />
          <p className="font-bold">{userData.username}</p>
        </div>
        <div className="text-gray-500 mb-2">
          <p>{`${views.toLocaleString()} Views`}</p>
          <p>{timeAgo(createdAt)}</p>
        </div>
        <h2 className="text-lg font-bold mb-2">{title}</h2>
      </div>
    </Link>
  );
}

function timeAgo(timestamp) {
  const now = Date.now();
  const difference = now - new Date(timestamp);
  return `${Math.floor(difference / (1000 * 60 * 60))} hour ago`;
}
