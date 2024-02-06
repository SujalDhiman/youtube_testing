import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../endpoints";
import { fileHandleHeader } from "../../../headersCollection";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function FileUpload({ setOpenModal }) {
  const userData = useSelector((state) => state.auth.userData);
  const { handleSubmit, register } = useForm();

  console.log(userData)

  async function onSubmit(data) {

    if(userData === null)
    return toast("please login first to create video")

    let payload = {
      video: data.videoFile[0],
      thumbnail: data.thumbnail[0],
      title: data.title,
      description: data.description,
      isPublished: data.isPublished,
      owner: userData._id,
    };

    const response = await axios.post(`${URL}/video/createVideo`, payload, {
      headers: {
        "Content-Type": fileHandleHeader,
      },
      withCredentials: true,
    });

    console.log(response);

    console.log(payload);
  }
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-gray-800 p-6 rounded-lg">
        {/**Close Button */}
        <button
          className="absolute top-2 right-2 text-white"
          onClick={() => setOpenModal(false)}
        >
          X
        </button>
        {/**Video Select*/}

        <input
          type="file"
          name="upload"
          id="image"
          className="hidden"
          {...register("videoFile")}
        />

        <label htmlFor="image" className="cursor-pointer ">
          <div className="p-4 bg-slate-700 text-white text-center cursor-pointer m-3">
            <p className="mt-2">Click To Upload</p>
          </div>
        </label>
        {/**ThumbNail Select*/}

        <input
          type="file"
          id="thumbnail"
          className="hidden"
          {...register("thumbnail")}
        />

        <label htmlFor="thumbnail" className="cursor-pointer ">
          <div className="p-4 bg-slate-700 text-white text-center cursor-pointer m-3">
            <p className="mt-2">Click To Upload</p>
          </div>
        </label>
        {/**Title*/}
        <div className="mt-4">
          <label htmlFor="Title" className="text-white">
            Title
          </label>
          <input
            type="text"
            name="Title"
            id="Title"
            className="w-full p-2 border rounded mt-1"
            {...register("title")}
          />
        </div>
        {/**description*/}

        <div className="mt-4">
          <label htmlFor="description" className="text-white">
            description
          </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            className="w-full p-2 border rounded mt-1"
            {...register("description")}
          ></textarea>
        </div>
        <input type="checkbox" name="isPublic" {...register("isPublished")} />

        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 mr-2"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button className="bg-green-500 text-white px-4 py-2">Submit</button>
        </div>
      </div>
    </form>
    <ToastContainer />
    </>
  );
}
