import Description from "../utils/Description";
import { Likes } from "../utils/Likes"; // Import the LikeComponent

export function VideoDisplay({ video }) {
  const {
    userData,
    title,
    description,
    views,
    createdAt,
    videoFile,
    _id,
    likes,
    likedByUser,
  } = video;
  return (
    <div className="min-h-screen bg-[#1d1d1d]">
      <div style={{ width: "100%", height: "80vh", overflow: "hidden" }}>
        <video
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={videoFile.secure_url}
          alt="Video"
          autoPlay
          controls
        />
      </div>
      <div className=" border-white border-2 p-7 rounded-3xl mr-4 ml-4 mt-2">
        <div className="rounded-3xl">
          <div className="flex flex-col md:flex-row items-start">
            <div className="mt-4 text-lg md:text-xl lg:text-2xl font-bold text-white">
              {title}
            </div>
            {/* Like Component */}

            <div className="p-2 mt-5 md:mt-3 md:ml-6 lg:ml-8 xl:ml-12 text-white bg-[#AE7AFF] rounded-xl text-xl">
              <Likes
                videoId={_id}
                initialLikes={likes}
                initialLiked={likedByUser}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mt-2 text-sm md:text-base lg:text-lg text-white">
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
        <div className="flex items-center mt-2">
          <img
            src={userData.avatar.url}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="text-base md:text-lg lg:text-xl font-semibold text-white">
            {userData.username}
          </span>
        </div>
        <div>
          <Description description={description} />
        </div>
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
