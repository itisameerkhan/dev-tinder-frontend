import axios from "axios";
import "./RequestCard.scss";
import { BASE_URL } from "../../utils/constants";

const RequestCard = ({ data, fetchRequests }) => {
  const handleRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      await fetchRequests();
    } catch (e) {
      console.log(e);
    }
  };

  const { _id, firstName, lastName, age, photoURL } = data.fromUserId;
  return (
    <div className="request-card">
      <div className="r-c-1">
        <img src={photoURL} alt="img" />
      </div>
      <div className="r-c-2">
        <h2>{firstName + " " + lastName}</h2>
        <p>{age}</p>
      </div>
      <div className="r-c-3">
        <button onClick={() => handleRequest("accepted", _id)}>
          <i className="fa-solid fa-thumbs-up"></i>accept
        </button>
        <button onClick={() => handleRequest("rejected", _id)}>
          <i className="fa-solid fa-thumbs-down"></i>reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
