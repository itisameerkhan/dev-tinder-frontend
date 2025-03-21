import axios from "axios";
import "./Feed.scss";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import UserCard from "../UserCard/UserCard";

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

  if (!feed) {
    return <Loader />;
  }

  if (feed.length === 0)
    return (
      <div className="feed-empty-main">
        <div className="feed-empty">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-illustration-download-in-svg-png-gif-file-formats--not-seach-available-nothing-error-state-pack-seo-web-illustrations-2133696.png?f=webp"
            alt="img"
          />
          <h2>Feed is empty</h2>
        </div>
      </div>
    );

  return (
    <div className="feed">
      <div className="feed-main-1">
        {/* {feed && feed.map((data) => <UserCard data={data} key={data._id} />)} */}
        {feed && <UserCard data={feed[0]} />}
      </div>
    </div>
  );
};

export default Feed;
