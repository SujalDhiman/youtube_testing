import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../endpoints";
import { VideoDisplay } from "./DisplayOneVideo";
import { useSelector } from "react-redux";
import { jsonHandleHeader } from "../../../headersCollection";
import { Comment } from "../utils/Comments";

export function ParticularVideo() {
  const userData = useSelector((state) => state.auth.userData);
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchThisVideo() {
      try {
        const res = await axios.post(
          `${URL}/video/getParticularVideo/${id}`,
          {
            userId:
              userData === null ? "5f4f54c11e35ab609d377c65" : userData._id,
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
    fetchThisVideo();
  }, [id, userData]);

  useEffect(() => {}, []);

  return (
    <>
      {video && <VideoDisplay video={video} />}
      {/* Comment Componenet */}
      <Comment
        username="User123"
        timestamp="2 hours ago"
        commentText="This is a great video!"
      />
    </>
  );
}
