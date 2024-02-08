import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../endpoints";
import { VideoDisplay } from "./VideoDisplay";

export function ParticularVideo() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchThisVideo() {
      try {
        const res = await axios.get(`${URL}/video/getParticularVideo/${id}`, {
          withCredentials: true,
        });
        setVideo(res.data.data[0]);
        console.log(res.data.data[0]);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    }
    fetchThisVideo();
  }, [id]);

  return <>{video && <VideoDisplay video={video} />}</>;
}
