import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation();

  const pathBoolean =
    location.pathname != "/login" && location.pathname != "/signup";

  const handleLogout = async () => {};

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
                <Link>
                  <p onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    logout
                  </p>
                </Link>
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
