import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../endpoints";
import { VideoDisplay } from "./DisplayOneVideo";
import { useSelector } from "react-redux";
import { jsonHandleHeader } from "../../../headersCollection";
import { Comment } from "../utils/Comments";
import { TextInputWithButtons } from "../utils/CommentInputText";
// import { Recommend\edVideo } from "../utils/ShowHistoryVideo";

export function ParticularVideo() {
  const userData = useSelector((state) => state.auth.userData);
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  async function fetchThisVideo() {
    try {
      const res = await axios.post(
        `${URL}/video/getParticularVideo/${id}`,
        {
          userId: userData === null ? "5f4f54c11e35ab609d377c65" : userData._id,
        },
        {
          headers: { "Content-Type": jsonHandleHeader },
          withCredentials: true,
        }
      );
      setVideo(res.data.data[0]);
      console.log(res.data.data[0]);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  }
  useEffect(() => {
    return () => fetchThisVideo();
  }, []);

  return (
    <div className="bg-[#1d1d1d]">
      {video && <VideoDisplay video={video} />}
      {/* Comment Componenet */}
      <div className="flex">
        <div className="mt-4 mr-4 ml-4 border-2 border-white rounded-xl p-2 w-3/5 pr-4 h-fit">
          <p className=" font-bold text-start text-white p-4 text-xl">
            {504} comments
          </p>
          <TextInputWithButtons userData={userData} />
          <Comment
            username="User123"
            timestamp="2 hours ago"
            commentText="This is a great video!"
          />
        </div>
        <div className=" w-[40%]">
          {/* TODO: */}
          {/* <div className="mt-4 mr-4 ml-4 border-2 border-white rounded-xl p-2 pr-4">
            <h2 className=" font-semibold mb-2 text-white text-start text-xl p-4 ">
              Recommended Videos
            </h2>
            <RecommendedVideo />
            <RecommendedVideo />
          </div> */}
        </div>
      </div>
    </div>
  );
}
