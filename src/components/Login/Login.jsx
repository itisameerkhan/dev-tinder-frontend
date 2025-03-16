import "./Login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <h1>Login</h1>
      <Link to={"/"}>
        <button>
          <h2>home</h2>
        </button>
      </Link>
    </div>
  );
};

export default Login;
