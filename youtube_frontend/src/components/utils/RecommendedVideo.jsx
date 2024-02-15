export function RecommendedVideo() {
  return (
    <div className="mb-4 border-2 border-white rounded-lg flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/6 h-40 bg-white rounded-lg mb-4 lg:mb-0 lg:mr-4"></div>
      <div className="w-full lg:w-3/6 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm mt-2 text-white font-bold break-words">
            Titleesvfesvsbdzbfdababadfbgaregbarebgaerbreav dsedgewsgerdeg
          </h3>
        </div>
        <p className="text-white">Channel Name</p>
        <div className="flex">
          <p className="text-white">{2} views</p>
          <p className="text-white ml-4 flex text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-dot h-full"
              viewBox="0 0 16 16"
            >
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
            </svg>
            {1} days ago
          </p>
        </div>
      </div>
    </div>
  );
}
