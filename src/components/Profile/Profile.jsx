import { useDispatch, useSelector } from "react-redux";
import "./Profile.scss";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";

const Profile = () => {
  const userData = useSelector((store) => store.user);
  const [isEdit, setIsEdit] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const handleButton = async () => {
    const { firstName, lastName, phoneNumber, age, gender, about, photoURL } =
      user;
      
    if (!isEdit) {
      const res = await axios.patch(
        BASE_URL + "/api/edit/profile",
        { firstName, lastName, phoneNumber, age, gender, about, photoURL },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(user));

      setIsEdit(!isEdit);
    } else {
      setIsEdit(!isEdit);
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
              <input
                type="text"
                value={user.gender}
                readOnly={isEdit}
                name="gender"
                onChange={handleChange}
              />
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
    </div>
  );
};

export default Profile;
