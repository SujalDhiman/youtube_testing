import { Link } from "react-router-dom";
export function ShowVideo({ video }) {
  const { thumbnail, title, views = 0, userData, createdAt, _id } = video;

  return (
    <Link to={`/getParticularVideo/${_id}`}>
      <div className="bg-red-400 p-4 shadow-md h-64 w-96 ">
        <div className="w-[100px] h-[100px]">
          <img
            src={thumbnail.secure_url}
            alt="Thumbnail"
            className="align-middle"
          />
        </div>
        <p className="text-xl font-semibold mb-2 line-clamp-2">{title}</p>
        <div className="flex items-center space-x-2 mb-2">
          <img
            src={userData.avatar.url}
            alt="Owner"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-600">{userData.username}</p>
        </div>
        <div className="flex items-center space-x-4 text-gray-500 text-sm mb-2">
          <p>{`${views.toLocaleString()} Views`}</p>
          <span className="dot-divider"></span>
          <p>{timeAgo(createdAt)}</p>
        </div>
      </div>
    </Link>
  );
}

function timeAgo(timestamp) {
  const now = Date.now();
  const difference = now - new Date(timestamp);
  return `${Math.floor(difference / (1000 * 60 * 60))} hour`;
}
