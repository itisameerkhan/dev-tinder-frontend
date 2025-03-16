import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-1">
        <div className="header-left">
          <h1 className="logo">DevTinder</h1>
          <span className="material-symbols-outlined">local_fire_department</span>
        </div>
        <div className="header-right">
          <img
            src="https://avatars.githubusercontent.com/u/106725517?v=4"
            alt="profile-pic"
          />
        </div>
      </div>
      <div className="header-2"></div>
    </div>
  );
};

export default Header;
