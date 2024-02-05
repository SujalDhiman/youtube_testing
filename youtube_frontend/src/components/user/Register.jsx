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
    toast(`${res.data.message}`)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <ToastContainer />
    </form>
  );
}
