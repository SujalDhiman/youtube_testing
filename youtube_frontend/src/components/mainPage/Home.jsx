import { useSelector } from "react-redux";

export default function Home() {
  const authStatus = useSelector((state) => state.auth.userStatus);
  return (
    <nav>
      {!authStatus ? (
        <>
          <button>SignUp</button>
          <button>Login</button>
        </>
      ) : (
        <button>LogOut</button>
      )}
    </nav>
  );
}
