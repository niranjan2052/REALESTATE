import "./layout.scss";
import Navbar from "../../components/navbar/Navbar.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
const RequireAuth = () => {
  const user = useSelector((state) => state.user.value);

  return !user ? (
    <Navigate to="/" />
  ) : (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
export { RequireAuth };
