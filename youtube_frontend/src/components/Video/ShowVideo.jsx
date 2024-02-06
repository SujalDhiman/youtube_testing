export function ShowVideo({ video }) {
  const { thumbnail, title, ownerImage, uploadDate, views, owner } = video;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={thumbnail}
        alt="Thumbnail"
        className="w-full h-32 object-cover mb-4 rounded"
      />
      <p className="text-xl font-semibold mb-2">{title}</p>
      <div className="flex items-center space-x-2 mb-2">
        <img src={ownerImage} alt="Owner" className="w-8 h-8 rounded-full" />
        <p className="text-gray-600">{owner}</p>
      </div>
      <p className="text-gray-500 text-sm mb-2">{`${timeAgo(
        uploadDate
      )} ago`}</p>
      <p className="text-gray-500 text-sm mb-2">{`${views} Views`}</p>
    </div>
  );
}

function timeAgo(timestamp) {
  const now = Date.now();
  const difference = now - timestamp;
  return `${Math.floor(difference / (1000 * 60 * 60))} hours`;
}
