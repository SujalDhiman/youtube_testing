import { useForm } from "react-hook-form";
import { URL } from "../../endpoints";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    const arr = [
      data.username,
      data.password,
      data.email,
      data.fullName,
      data.avatar[0],
      data.coverImage[0],
    ];
    if (arr.some((el) => el === "")) {
      toast("All Fields are compulsory");
      return;
    }
    let payload = {
      username: data.username,
      password: data.password,
      email: data.email,
      fullName: data.fullName,
      avatar: data.avatar[0],
      coverImage: data.coverImage[0],
    };

    const res = await axios.post(`${URL}/users/register`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    toast(`${res.data.message}`);
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Signup</h1>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="username"
              className="block text-gray-800 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your username"
              {...register("username")}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-800 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your email address"
              {...register("email")}
            />
          </div>
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-800 font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your full name"
              {...register("fullName")}
            />
          </div>
          <div>
            <label
              htmlFor="file1"
              className="block text-gray-800 font-bold mb-2"
            >
              Avatar
            </label>
            <input
              type="file"
              id="file1"
              name="file1"
              className="w-full border border-gray-300 p-2 rounded-lg"
              {...register("avatar")}
            />
          </div>
          <div>
            <label
              htmlFor="file2"
              className="block text-gray-800 font-bold mb-2"
            >
              Cover Image
            </label>
            <input
              type="file"
              id="file2"
              name="file2"
              className="w-full border border-gray-300 p-2 rounded-lg"
              {...register("coverImage")}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-800 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your password"
              {...register("password")}
            />
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
      <ToastContainer />
    </div>
  );
}

//previous code
{
  /* <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        placeholder="Enter Name"
        id="username"
        {...register("username")}
      />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" {...register("email")} />
      <label htmlFor="fullName">fullName </label>
      <input
        type="text"
        name="fullName"
        id="fullName"
        {...register("fullName")}
      />
      <input type="file" name="avatar" {...register("avatar")} />
      <input type="file" name="coverImage" {...register("coverImage")} />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        {...register("password")}
      />
      <button type="submit">Submit</button>
    </form>
  ); */
}
