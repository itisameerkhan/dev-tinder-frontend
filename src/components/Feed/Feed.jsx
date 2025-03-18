import axios from "axios";
import "./Feed.scss";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);
  // const feed = null;

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (e) {
      console.log(e);
      navigate("/invalid");
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  if(!feed) {
    return <Loader />
  }
  

  return (
    <div className="feed">
      <h1>Feed</h1>
      <div className="feed-main-1">
      {feed && feed.map((data) => (
        <div className="feed-main" key={data.id}>
          <img src={data.photoURL} alt="img" />
        </div>
      ))}
      </div>
    </div>
  );
};

export default Feed;
