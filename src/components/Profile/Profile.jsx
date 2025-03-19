import { useDispatch, useSelector } from "react-redux";
import "./Profile.scss";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { Button, LinearProgress, Snackbar } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";

const Profile = () => {
  const userData = useSelector((store) => store.user);
  const [isEdit, setIsEdit] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "i love coding",
  });

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({
      ...snackBar,
      open: false,
    });
  };

  const handleButton = async () => {
    try {
      const { firstName, lastName, phoneNumber, age, gender, about, photoURL } =
        user;

      if (!isEdit) {
        setIsLoading(true);
        const res = await axios.patch(
          BASE_URL + "/api/edit/profile",
          { firstName, lastName, phoneNumber, age, gender, about, photoURL },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(addUser(user));
          setIsEdit(!isEdit);
          setIsLoading(false);
          setSnackBar({
            open: true,
            message: res.data.message,
          });
        } else {
          setIsEdit(!isEdit);
          setIsLoading(false);
          setSnackBar({
            open: true,
            message: res.data.message,
          });
        }
      } else {
        setIsEdit(!isEdit);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e.response.data);

      setSnackBar({
        open: true,
        message: e.response.data.message,
      });
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="profile">
      <div className="profile-main">
        {isLoading && <LinearProgress className="p-m-load" />}
        <div className="p-m-1">
          <img src={user?.photoURL} alt="photo" />
          <Button
            variant="contained"
            className="btn-pm1"
            onClick={handleButton}
          >
            {isEdit ? (
              <p>
                <i className="fa-solid fa-pen-to-square"></i>
                Edit
              </p>
            ) : (
              <p>
                <i className="fa-solid fa-floppy-disk"></i>
                Save
              </p>
            )}
          </Button>
        </div>
        <div className="p-m-2">
          <div className="p-m-2-1">
            <div className="p-m-l">
              <label>firstName</label>
              <input
                type="text"
                value={user.firstName}
                readOnly={isEdit}
                name="firstName"
                onChange={handleChange}
              />
            </div>
            <div className="p-m-l">
              <label>lastName</label>
              <input
                type="text"
                value={user.lastName}
                readOnly={isEdit}
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="p-m-2-1">
            <div className="p-m-l">
              <label>age</label>
              <input
                type="text"
                value={user.age}
                readOnly={isEdit}
                name="age"
                onChange={handleChange}
              />
            </div>
            <div className="p-m-l">
              <label>Gender</label>
              {isEdit ? (
                <input type="text" value={user.gender} name="gender" readOnly />
              ) : (
                <select
                  name="gender"
                  className="p-m-l-s"
                  value={user.gender}
                  onChange={handleChange}
                  readOnly={isEdit}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              )}
            </div>
          </div>
          <div className="p-m-2-1">
            <div className="p-m-l">
              <label>phone number</label>
              <input
                type="text"
                value={user.phoneNumber}
                readOnly={isEdit}
                name="phoneNumber"
                onChange={handleChange}
              />
            </div>
            <div className="p-m-l">
              <label>photo URL</label>
              <input
                type="text"
                value={user.photoURL}
                readOnly={isEdit}
                name="photoURL"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="p-m-2-1">
            <div className="p-m-l">
              <label>About</label>
              <input
                type="text"
                value={user.about}
                readOnly={isEdit}
                name="about"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackBar.open}
        message={snackBar.message}
        onClose={handleSnackBarClose}
        autoHideDuration={5000}
      />
    </div>
  );
};

export default Profile;
