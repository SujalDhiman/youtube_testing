import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../endpoints";
import { fileHandleHeader } from "../../../headersCollection";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function FileUpload({ setOpenModal }) {
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const { handleSubmit, register } = useForm();

  console.log(userData);

  async function onSubmit(data) {
    if (userData === null) return toast("please login first to create video");

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <div className="flex justify-between items-center mb-6"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="files"
                className="block text-gray-800 font-bold mb-2"
              >
                Video
              </label>
              <input
                type="file"
                id="files"
                name="files"
                className="w-full border border-gray-300 p-2 rounded-lg"
                {...register("videoFile")}
              />
            </div>
            <div>
              <label
                htmlFor="files"
                className="block text-gray-800 font-bold mb-2"
              >
                Thumbnail
              </label>
              <input
                type="file"
                id="files"
                name="files"
                className="w-full border border-gray-300 p-2 rounded-lg"
                {...register("thumbnail")}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-800 font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter Title"
                {...register("title")}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-800 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your message"
                {...register("description")}
              ></textarea>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                className="mr-2"
                {...register("isPublished")}
              />
              <label htmlFor="agree" className="text-gray-800 font-bold">
                Public
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

// return (
//   <>
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="bg-gray-800 p-6 rounded-lg">
//         {/**Close Button */}
//         <button
//           className="absolute top-2 right-2 text-white"
//           onClick={() => setOpenModal(false)}
//         >
//           X
//         </button>
//         {/**Video Select*/}

//         <input
//           type="file"
//           name="upload"
//           id="image"
//           className="hidden"
//           {...register("videoFile")}
//         />

//         <label htmlFor="image" className="cursor-pointer ">
//           <div className="p-4 bg-slate-700 text-white text-center cursor-pointer m-3">
//             <p className="mt-2">Click To Upload</p>
//           </div>
//         </label>
//         {/**Thumbnail Select*/}
//         <div className="mb-6">
//           <label htmlFor="thumbnail" className="block text-white mb-2">
//             Thumbnail
//           </label>
//           <input
//             type="file"
//             id="thumbnail"
//             className="hidden"
//             {...register("thumbnail")}
//           />
//           <label
//             htmlFor="thumbnail"
//             className="cursor-pointer bg-slate-700 text-white py-2 px-4 rounded-lg text-center"
//           >
//             Click To Upload
//           </label>
//         </div>
//         {/**Title*/}
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-white mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             className="w-full p-2 border rounded focus:outline-none focus:border-green-500"
//             {...register("title")}
//           />
//         </div>
//         {/**Description*/}
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-white mb-2">
//             Description
//           </label>
//           <textarea
//             id="description"
//             rows="5"
//             className="w-full p-2 border rounded focus:outline-none focus:border-green-500"
//             {...register("description")}
//           ></textarea>
//         </div>
//         {/**Checkbox for Public/Private*/}
//         <div className="mb-4 flex items-center">
//           <input
//             type="checkbox"
//             id="isPublished"
//             {...register("isPublished")}
//             className="mr-2"
//           />
//           <label htmlFor="isPublished" className="text-white">
//             Publish
//           </label>
//         </div>
//         {/**Submit Buttons*/}
//         <div className="flex justify-end">
//           <button
//             type="button"
//             className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600 focus:outline-none"
//             onClick={() => setOpenModal(false)}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </form>
//     <ToastContainer />
//   </>
// );
