import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const Navigation = () => {
  const authContext = useContext(AuthContext);

  const { isLoggedIn, logout } = authContext;

  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="ui massive menu">
      <div className="header item">
        <div className="ui left icon">
          <i className="book icon"></i>
        </div>
        College Library
      </div>
      {isLoggedIn && (
        <NavLink to="/home" className="item">
          Home
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to="/library" className="item">
          Library
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to="/admin" className="item">
          Admin
        </NavLink>
      )}
      <div className="right menu">
        {!isLoggedIn && (
          <NavLink to="/login" className="item">
            Login
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink to="/register" className="item">
            Register
          </NavLink>
        )}
        {isLoggedIn && (
          <button className="ui orange button item" onClick={logoutHandler}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
