import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../endpoints";
import { VideoDisplay } from "./DisplayOneVideo";
import { useSelector } from "react-redux";
import { jsonHandleHeader } from "../../../headersCollection";
import { Comment } from "../utils/Comments";
import { TextInputWithButtons } from "../utils/CommentInputText";
import { RecommendedVideo } from "../utils/RecommendedVideo";

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
          <TextInputWithButtons userData={userData} />
          <Comment
            username="User123"
            timestamp="2 hours ago"
            commentText="This is a great video!"
          />
        </div>
        <div className=" w-[40%]">
          {/* TODO: */}
          <h2 className="text-lg font-semibold mb-2">Recommended Videos</h2>

          <RecommendedVideo />
          <RecommendedVideo />
        </div>
      </div>
    </div>
  );
}
