import { useState } from "react";
import { useFormik } from "formik";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({});
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={formik.handleSubmit}>
          <h1>Login Page</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
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
