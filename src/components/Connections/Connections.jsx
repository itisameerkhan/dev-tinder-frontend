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
    fetchConnections();
  }, []);

  if (!connections) return <Loader />;

  if (connections.length === 0) return (
    <div className="no-connection">
      <h1>no connection were found</h1>
      <img src="https://static.vecteezy.com/system/resources/thumbnails/021/975/488/small/search-not-found-3d-render-icon-illustration-with-transparent-background-empty-state-png.png" alt="img" />
    </div>
  );

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
