import { Likes } from "../utils/Likes"; // Import the LikeComponent

export function VideoDisplay({ video }) {
  const { userData, title, description, views, createdAt, videoFile } = video;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <video
        className="w-full md:max-w-screen-md lg:max-w-screen-lg h-auto shadow-lg"
        src={videoFile.secure_url}
        alt="Video"
        autoPlay
        controls
      />
      <div className="mt-4 text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
        {title}
      </div>
      <div className="flex items-center mt-2">
        <img
          src={userData.avatar.url}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="text-base md:text-lg lg:text-xl font-semibold text-gray-700">
          {userData.username}
        </span>
      </div>
      <div className="flex items-center mt-2 text-sm md:text-base lg:text-lg text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 14.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 11.414V17a1 1 0 01-2 0v-5.586L5.707 14.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>{views} Views</span>
        <span className="mx-2">•</span>
        <span>{timeAgo(createdAt)}</span>
      </div>
      <p className="text-gray-800 mt-4 text-base md:text-lg lg:text-xl">
        {description}
      </p>

      {/* Like Component */}
      <div className="flex items-center mt-4">
        <Likes
          videoId={videoFile.public_id}
          initialLikes={0}
          initialLiked={0}
        />
      </div>
    </div>
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
