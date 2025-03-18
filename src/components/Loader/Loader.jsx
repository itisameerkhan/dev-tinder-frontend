import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-main">
      <div className="card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">Friends</span>
            <span className="word">Developers</span>
            <span className="word">Connections</span>
            <span className="word">Partner</span>
            <span className="word">Peoples</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
