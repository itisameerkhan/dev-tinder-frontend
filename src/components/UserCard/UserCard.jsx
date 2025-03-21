import { Link } from "react-router-dom";
import "./UserCard.scss";
import { Button } from "@mui/material";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";
import axios from "axios";

const UserCard = ({ data }) => {
  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    phoneNumber,
    about,
    photoURL,
  } = data;

  const dispatch = useDispatch();

  const handleFeed = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="user-card" id="card-interested">
      <div className="uc-1">
        <img src={photoURL} alt="pic" className="uc-1-img" />
      </div>
      <div className="uc-2">
        <p className="uc-2-1">{firstName + " " + lastName}</p>
        <p className="uc-2-2">{age}</p>
        <div className="uc-2-btn">
          <button onClick={() => handleFeed("interested", _id)}>
            <i className="fa-solid fa-heart"></i>
            <p>Interest</p>
          </button>
          <button onClick={() => handleFeed("ignored", _id)}>
            <i class="fa-solid fa-xmark"></i>
            <p>Ignore</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
