import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { inStorage } from "../../lib/index.js";
import { setUser } from "../../store/index.js";
import http from "../../http/index.js";
import "./profileUpdatePage.scss";
import { toast } from "react-toastify";
import UploadWidget from "../../components/uploadWidget/UploadWidget.jsx";
import { useState } from "react";

const ProfileUpdatePage = () => {
  const user = useSelector((state) => state.user.value);
  const [avatar, setAvatar] = useState([]);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string(),
      email: Yup.string(),
      password: Yup.string(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      const { username, email, password } = values;
      let newValue = null;
      if (password === "") {
        newValue = { username, email, avatar: avatar[0] };
      } else {
        newValue = { username, email, password, avatar: avatar[0] };
      }
      http
        .patch(`/user/${user.id}`, newValue)
        .then(({ data }) => {
          inStorage("user", JSON.stringify(data), true);
          dispatch(setUser(data));
          toast.success("User Info Updated Successfully");
        })
        .catch(() => {})
        .finally(() => {
          setSubmitting(false);
        });
    },
  });
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={formik.handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <button type="submit" disabled={formik.isSubmitting}>
            Update
          </button>
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || user.avatar || "./noAvatar.jpeg"}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dpdku6o5e",
            uploadPreset: "realestate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
