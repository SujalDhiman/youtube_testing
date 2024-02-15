import { Link } from "react-router-dom";

export function ShowVideo({ video }) {
  const { thumbnail, title, totalViews = 0, userData, createdAt, _id } = video;
  return (
    <Link
      to={`/getParticularVideo/${_id}`}
      className="bg-[#1d1d1d] shadow-lg w-full h-full "
    >
      {/* thumbnail  */}
      <div className="mb-4">
        <img
          src={thumbnail.secure_url}
          alt="Thumbnail"
          className="w-full h-40 max-w-full "
        />
      </div>
      <div className="flex">
        <div className="flex-shrink-0 min-w-12 min-h-12">
          <img
            src={userData.avatar.url}
            alt="Owner"
            className="w-12 h-12 object-cover rounded-full mr-2"
          />
        </div>
        <div className=" ml-2 flex flex-col justify-between">
          <h2 className="text-lg font-bold mb-2 text-white">
            {title.length > 20 ? title.substring(0, 21) + "..." : title}
          </h2>
          <div className="text-white mb-2 flex justify-around">
            <p>{`${totalViews.toLocaleString()} Views`}</p>
            <p className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dot mt-1"
                viewBox="0 0 16 16"
              >
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              </svg>
              {timeAgo(createdAt)}
            </p>
          </div>
          <p className="text-white text-[18px]">
            {userData.username.length > 15
              ? userData.username.substring(0, 16) + "..."
              : userData.username}
          </p>
        </div>
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
