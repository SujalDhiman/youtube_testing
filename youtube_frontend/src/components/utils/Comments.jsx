export function Comment({ username, timestamp, commentText }) {
  return (
    <div className="flex items-start bg-[#1d1d1d]">
      <img
        className="w-10 h-10 rounded-full mr-4"
        src="https://via.placeholder.com/150"
        alt="Avatar"
      />
      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          <span className="font-semibold mr-1 text-white">{username}</span>
          <span className="text-white text-sm">{timestamp}</span>
        </div>
        <p className="text-white">{commentText}</p>
      </div>
    </div>
  );
}
