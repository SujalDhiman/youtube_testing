import { useState } from "react";
import axios from "axios";
function App() {
  let URL = "http://localhost:10000/api/v1/video/createVideo";

  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  async function submitHoGya(e) {
    e.preventDefault();
    const res = await axios.post(
      URL,
      {
        text,
        url,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res);
    console.log(text);
    console.log(url);
  }
  return (
    <form onSubmit={submitHoGya}>
      <input
        type="file"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <input
        type="text"
        name="title"
        id="title"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
