export function MyChannel() {
  return (
    <div className="bg-[#1d1d1d] h-screen w-screen text-red-500 font-bold text-lg">
      <div className="w-screen bg-white h-[30%] relative pl-10 ">
        {/* <img src="" alt="" /> */}
        <div className="absolute top-3/4 left-0 right-0 flex items-center h-fit ml-12">
          <div className="bg-red-400 rounded-full h-36 w-36 border-2 border-green-400">
            {/* <img src="" alt="" /> */}
          </div>
          <div className="p-4">
            <div>
              <div>Yash Mittal</div>
              <div>@YashMittal</div>
            </div>
            <div className="flex items-center">
              <div>{600}k Subscribers</div>
              <div className="flex items-center pl-5">
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
                <p>{200} Subscribed</p>
              </div>
            </div>
          </div>
          <button className="flex bg-green-400 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-plus text-bold h-full pr-2"
              viewBox="0 0 16 16"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              <path d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
            </svg>
            <div>Follow</div>
          </button>
        </div>
      </div>
    </div>
  );
}
