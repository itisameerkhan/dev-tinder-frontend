import Feed from "../Feed/Feed";
import "./Body.scss";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="body">
      <h1>body</h1>
      <Link to={"/profile"}>
        <button>
          <h2>profile</h2>
        </button>
      </Link>
      <Link to={"/invalid"}>
        <button>
          <h2>invalid</h2>
        </button>
      </Link>
      <Link to={"/login"}>
        <button>
          <h2>login</h2>
        </button>
      </Link>
      <Feed />
    </div>
  );
};

export default Body;
