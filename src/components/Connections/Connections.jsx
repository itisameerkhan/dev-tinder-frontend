import { useDispatch, useSelector } from "react-redux";
import "./Connections.scss";
import axios from "axios";
import { addConnections } from "../../utils/connectionSlice";
import { BASE_URL } from "../../utils/constants";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ConnectionCard from "../ConnectionCard/ConnectionCard";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    {
      !connections && fetchConnections();
    }
  }, []);

  if (!connections) return <Loader />;

  if (connections.length === 0) return <h1>No connections were found</h1>;

  return (
    <div className="connections">
      <div className="connections-main">
        <h1>Connections</h1>
        <div className="connection-cards">
          {connections.map((data) => (
            <ConnectionCard data={data} key={data._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
