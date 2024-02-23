import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";

export function TextInputWithButtons({ userData }) {
  const [showButtons, setShowButtons] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const [totalComments, setTotalComments] = useState([]);

  //TODO:
  async function onSubmit(data) {
    setShowButtons(false);
    reset();
    const comment = {
      text: data.comment,
    };
  }

  return (
    <div className="flex flex-row items-center justify-center bg-[#1d1d1d] pt-8 pb-10">
      <img
        src={userData && userData.avatar.url}
        alt="userImage"
        className="w-10 h-10 rounded-full ml-2"
      />
      <div className="bg-#[1d1d1d] pr-10 pl-4 rounded-lg shadow-lg w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="w-full border text-white bg-[#1d1d1d] border-t-0 border-l-0 border-r-0 outline-none border-b-2 border-b-white"
            placeholder="Add a Comment"
            onClick={() => setShowButtons(true)}
            {...register("comment")}
          />
          {showButtons && (
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-[#AE7AFF] text-white font-bold py-2 px-4 rounded mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-red-500  text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setShowButtons(false);
                  reset();
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
