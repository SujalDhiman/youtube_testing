// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Main } from "./Main";
import { Modal } from "../utils/Modal";

export default function Home() {
  // const navigate = useNavigate();
  // const authStatus = useSelector((state) => state.auth.userStatus);

  // function signUp() {
  //   navigate("/signUp");
  // }

  // function login() {
  //   navigate("/login");
  // }

  return (
    // <nav>
    //   {!authStatus ? (
    //     <>
    //       <button onClick={signUp}>SignUp</button>
    //       <button onClick={login}>Login</button>
    //     </>
    //   ) : (
    //     <button>LogOut</button>
    //   )}
    // </nav>
    // <div>
    //   <Header />
    //   <div>
    //     <NavBar />
    //     <Body />
    //   </div>
    // </div>
    <>
      <Modal />
    </>
  );
}
