import "./Login.scss";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    emailId: "ameerkhan@example.com",
    password: "Password@123",
  });
  const [isLoading, setIsLoading] = useState(false);

  const userDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitFunction = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:8080/api/login", user);
      console.log(res.data);
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
        <button onClick={submitFunction} style={{cursor: isLoading ? "not-allowed" : "pointer"}}>
          {isLoading ? <div className="spinner-loader-1"></div> : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
