import axios from "axios";
import "./Requests.scss";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../utils/requestSlice";
import { useEffect } from "react";
import RequestCard from "../RequestCard/RequestCard";
import Loader from "../Loader/Loader";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <Loader />;

  if(requests.length === 0 ) return (
    <div className="no-connection">
      <h1>no Requests were found</h1>
      <img src="https://static.vecteezy.com/system/resources/thumbnails/021/975/488/small/search-not-found-3d-render-icon-illustration-with-transparent-background-empty-state-png.png" alt="img" />
    </div>
  )

  return (
    <div className="requests">
        <h1>Requests</h1>
      <div className="request-main">
        <div className="r-m-1">
          {requests.map((data) => (
            <RequestCard key={data._id} data={data} fetchRequests={fetchRequests} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Requests;
