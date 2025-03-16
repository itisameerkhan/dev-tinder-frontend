import "./Error.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const Error = () => {
  return (
    <div className="error-element">
      <Header />
      <div className="error-element-main">
        <h1>INVALID PATH</h1>
        <h2>404 Not Found</h2>
        <Link to={"/"}>
          <Button variant="outlined">Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
