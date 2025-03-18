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
    emailId: "ameerkhan@example.com",
    password: "Password@123",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "i love coding",
  });

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

  const submitFunction = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(BASE_URL + "/api/login", user, {
        withCredentials: true,
      });
      
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

  return (
    <div className="login">
      <div className="login-main">
        <h1>login</h1>
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
        <p
          className="show-password-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "hide password" : "show password"}
        </p>
        <button
          onClick={submitFunction}
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
