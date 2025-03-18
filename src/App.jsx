import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/profile/view", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(addUser(res.data.data));
      } else {
        // navigate("/login");
        console.log(res.data);
      }
    } catch (e) {
      if (e.status === 401) {
        navigate("/login");
      }
      console.log(e);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
