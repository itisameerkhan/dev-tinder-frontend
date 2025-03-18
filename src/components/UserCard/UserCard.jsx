import { Link } from "react-router-dom";
import "./UserCard.scss";
import { Button } from "@mui/material";

const UserCard = ({ data }) => {
  const { firstName, lastName, age, gender, phoneNumber, about, photoURL } =
    data;
  return (
    <div className="user-card">
      <div className="uc-1">
        <img src={photoURL} alt="pic" className="uc-1-img" />
      </div>
      <div className="uc-2">
        <p className="uc-2-1">{firstName + " " + lastName}</p>
        <p className="uc-2-2">{age}</p>
        <div className="uc-2-btn">
          <button>
            <i className="fa-solid fa-heart"></i>
            <p>Interest</p>
          </button>
          <button>
            <i class="fa-solid fa-xmark"></i>
            <p>Ignore</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
