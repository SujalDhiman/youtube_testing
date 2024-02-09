import { Link } from "react-router-dom";

export function ShowVideo({ video }) {
  const { thumbnail, title, views = 0, userData, createdAt, _id } = video;

  return (
    <Link
      to={`/getParticularVideo/${_id}`}
      className="bg-white p-4 rounded-lg shadow-lg w-full h-fit"
    >
      <div>
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
  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
