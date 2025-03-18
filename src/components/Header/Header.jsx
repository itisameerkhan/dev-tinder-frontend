import "./Header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";
import { removeFeed } from "../../utils/feedSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const pathBoolean =
    location.pathname != "/login" && location.pathname != "/signup";

  const handleLogout = async () => {
    await axios.post(
      BASE_URL + "/api/logout",
      {},
      {
        withCredentials: true,
      }
    );

    dispatch(removeUser());
    dispatch(removeFeed());
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-1">
        <div className="header-left">
          <Link to={pathBoolean ? "/" : "/login"} className="header-left-link">
            <h1 className="logo">DevTinder</h1>
            <span className="material-symbols-outlined">polyline</span>
          </Link>
        </div>
        {user && pathBoolean && (
          <div className="header-right">
            <p className="h-r-1">
              Welcome,
              {user.firstName}
            </p>
            <div className="nav-img">
              <img src={user.photoURL} alt="profile-pic" className="h-img-1" />
              <div className="nav-img-1">
                <Link to={"/profile"}>
                  <p>
                    <i className="fa-solid fa-user"></i>
                    profile
                  </p>
                </Link>
                <a onClick={handleLogout}>
                  <p>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    logout
                  </p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="header-2"></div>
    </div>
  );
};

export default Header;
