import "./Login.scss";
import { Link } from "react-router-dom";
import { TextField, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "i love coding",
  });

  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({
      ...snackBar,
      open: false,
    });
  };

  const userDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        BASE_URL + "/api/login",
        { emailId: user.emailId, password: user.password },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res.data.success) {
        dispatch(addUser(res.data.data));
        navigate("/");
      } else {
        setSnackBar({
          open: true,
          message: res.data.message,
        });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      console.log(user);

      const res = await axios.post(
        BASE_URL + "/api/user/new",
        {
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          password: user.password,
        },
        { withCredentials: true }
      );

      console.log(res);

      if (res.data.success) {
        dispatch(addUser(res.data.data));
        navigate("/profile");
      } else {
        setSnackBar({
          open: true,
          message: res.data.message,
        });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setSnackBar({
        open: true,
        message: e.response.data.message,
      });
    }
  };
  return (
    <div className="login">
      <div className="login-main">
        <h1>{isLogin ? "login" : "Sign Up"}</h1>
        {!isLogin && (
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={userDataChange}
          />
        )}{" "}
        {!isLogin && (
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={userDataChange}
          />
        )}
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text"
          name="emailId"
          value={user.emailId}
          onChange={userDataChange}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          name="password"
          value={user.password}
          onChange={userDataChange}
        />
        <div className="login-p">
          <p
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "hide password" : "show password"}
          </p>
          <p className="nu-p" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "new user? signup" : "already having account? login"}
          </p>
        </div>
        <button
          onClick={isLogin ? handleLogin : handleSignup}
          style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          {isLoading ? <div className="spinner-loader-1"></div> : "Login"}
        </button>
      </div>
      <Snackbar
        open={snackBar.open}
        message={snackBar.message}
        onClose={handleSnackBarClose}
        autoHideDuration={5000}
      />
    </div>
  );
};

export default Login;
