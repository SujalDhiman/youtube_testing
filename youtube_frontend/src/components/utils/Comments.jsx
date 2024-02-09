export function Comment({ username, timestamp, commentText }) {
  return (
    <div className="flex items-start mt-4">
      <img
        className="w-10 h-10 rounded-full mr-4"
        src="https://via.placeholder.com/150"
        alt="Avatar"
      />
      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          <span className="font-semibold mr-1">{username}</span>
          <span className="text-gray-500 text-sm">{timestamp}</span>
        </div>
        <p className="text-gray-800">{commentText}</p>
      </div>
    </div>
  );
}
