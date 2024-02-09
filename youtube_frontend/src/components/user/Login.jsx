import { useForm } from "react-hook-form";
import axios from "axios";
import { URL } from "../../endpoints";
import { loginUser } from "../../reduxtoolkit/authSlice.js";
import { useDispatch } from "react-redux";

export default function Login() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  async function loginCurrentUser(data) {
    let payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    console.log(payload);

    const response = await axios.post(`${URL}/users/login`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log(response);
    const userDetails = response.data.data;
    dispatch(loginUser(userDetails));

    const accessToken = response.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user-id", userDetails._id);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-cinema">
      <div className="w-96 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit(loginCurrentUser)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="text-lg font-medium block mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your username"
              {...register("username")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-lg font-medium block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email"
              {...register("email")}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-lg font-medium block mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your password"
              {...register("password")}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//Previous Code
// return (
//     <form onSubmit={handleSubmit(loginCurrentUser)}>
//         <input type="text" {...register("username")} placeholder="enter username"/>
//         <br/>
//         <input type="text" {...register("email")} placeholder="enter email"/>
//         <br/>
//         <input type="text" {...register("password")} placeholder="enter password"/>
//         <br/>
//         <button type="Submit">Submit</button>
//     </form>
// )
