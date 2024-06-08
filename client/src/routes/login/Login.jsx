import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./login.scss";
import { useDispatch } from "react-redux";
import { setUser } from "../../store";
import http from "../../http";
import { inStorage } from "../../lib";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .post("auth/login", values)
        .then(({ data }) => {
          dispatch(setUser(data));
          inStorage("user", JSON.stringify(data), true);
          navigate("/");
        })
        .catch(() => {})
        .finally(() => {
          setSubmitting(false);
        });
    },
  });
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={formik.handleSubmit}>
          <h1>Login Page</h1>
          <input
            name="username"
            id="username"
            required
            minLength={3}
            maxLength={20}
            value={formik.values.username}
            onChange={formik.handleChange}
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
          <input
            name="password"
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
            placeholder="Password"
            autoComplete="off"
          />
          <button type="submit" disabled={formik.isSubmitting}>
            Login
          </button>
          {error && <span>{error}</span>}
          <Link to="/register">New User? Create an account.</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.jpeg" alt="" />
      </div>
    </div>
  );
}

export default Login;
