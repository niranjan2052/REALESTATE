import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./register.scss";
import http from "../../http";
import { toast } from "react-toastify";
import { setValidationErrors } from "../../lib";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .post("auth/register", values)
        .then(({ data }) => {
          navigate("/login");
        })
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={formik.handleSubmit}>
          <h1>Create an Account</h1>
          <input
            type="text"
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
          />
          <button type="submit" disabled={formik.isSubmitting}>
            Register
          </button>
          <Link to="/login">Already have an account.</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.jpeg" alt="" />
      </div>
    </div>
  );
};

export default Register;
