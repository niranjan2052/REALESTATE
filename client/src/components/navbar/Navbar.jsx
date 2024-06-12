import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../store";
import http from "../../http";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.value);
  const notificationNumber = useSelector((state) => state.notification.value);
  const dispatch = useDispatch();


  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>RealEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/agents">Agents</Link>
      </div>
      <div className="right">
        {user ? (
          <>
            <div className="user">
              <img src={user.avatar || "/noAvatar.jpeg"} alt="user_img" />
              <span>{user.username}</span>
              <Link to="/profile" className="profile">
                {notificationNumber > 0 && (
                  <div className="notification">{notificationNumber}</div>
                )}
                <span>Profile</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/register" className="register">
              Sign Up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img src="/menu.png" alt="menu_img" onClick={() => setOpen(!open)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          {!user && (
            <>
              <Link to="/">Sign In</Link>
              <Link to="/">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
