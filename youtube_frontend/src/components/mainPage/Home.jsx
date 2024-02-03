import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.userStatus);

  function signUp() {
    navigate("/signUp");
  }

  function login() {
    navigate("/login");
  }

  return (
    <nav>
      {!authStatus ? (
        <>
          <button onClick={signUp}>SignUp</button>
          <button onClick={login}>Login</button>
        </>
      ) : (
        <button>LogOut</button>
      )}
    </nav>
  );
}
