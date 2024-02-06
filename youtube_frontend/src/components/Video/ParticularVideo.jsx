import { useParams } from "react-router-dom";

export function ParticularVideo() {
  const { id } = useParams();
  console.log(id);
}
