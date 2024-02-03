import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const authStatus = useSelector((state) => state.auth.userStatus);
  return (
    <nav>
      {!authStatus ? (
        <>
          <button onClick={() => nav}>SignUp</button>
          <button>Login</button>
        </>
      ) : (
        <button>LogOut</button>
      )}
    </nav>
  );
}
