import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.userStatus);
  return (
    <nav>
      {!authStatus ? (
        <>
          <button onClick={() => navigate("/login")}>SignUp</button>
          <button onClick={() => navigate("/register")}>Login</button>
        </>
      ) : (
        <button>LogOut</button>
      )}
    </nav>
  );
}
