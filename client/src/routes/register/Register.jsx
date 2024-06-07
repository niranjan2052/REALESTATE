import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  return (
    <div className="registerPage">
      <div className="formContainer">
        <form>
          <h1>Create an Account</h1>
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Register</button>
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
