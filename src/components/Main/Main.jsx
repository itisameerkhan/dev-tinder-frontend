import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="main">
      <h1>main</h1>
      <Link to={"/"}>
        <button>
          <h2>Home</h2>
        </button>
      </Link>
      <Link to={"/dwdqwdqwd"}>
        <button>
          <h2>invalid path</h2>
        </button>
      </Link>
    </div>
  );
};

export default Main;
