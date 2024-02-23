import { ShowHistoryVideo } from "./ShowHistoryVideo";
import { URL } from "../../endpoints";
import axios from "axios";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function UserHistory() {
  const { _id } = useSelector((state) => state.auth.userData);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const res = await axios.get(`${URL}/video/getHistory/${_id}`);
      setHistory(res.data.data[0].userHistory);
      console.log(res.data.data[0].userHistory);
    };
    getHistory();
  }, []);

  return (
    <div className="bg-[#1d1d1d] min-h-screen text-white">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-4/12 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center bg-black rounded-xl shadow-xl cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-trash3 ml-4 h-full"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
              <p className="font-bold text-lg p-4">Clear all watch history</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-8/12 h-screen p-8 lg:p-16 overflow-y-auto">
          {history &&
            history.map((el) => <ShowHistoryVideo Videodata={el} key={el} />)}
        </div>
      </div>
    </div>
  );
}
