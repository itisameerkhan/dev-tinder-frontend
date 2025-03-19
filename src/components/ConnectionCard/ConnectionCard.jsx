import "./ConnectionCard.scss";

const ConnectionCard = ({ data }) => {
  const { firstName, lastName, photoURL, age, gender } = data;
  return (
    <div className="connection-card">
      <div className="c-c-1">
        <img src={photoURL} alt="img" />
      </div>
      <div className="c-c-2">
        <h2>{firstName + " "+ lastName}</h2>
        <p>{age}</p>
        <p>{gender}</p>
      </div>
    </div>
  );
};

export default ConnectionCard;
