import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const Navigation = () => {
  const authContext = useContext(AuthContext);

  const { isLoggedIn, logout, user } = authContext;

  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  let content;

  if (user && isLoggedIn && user.isAdmin) {
    content = (
      <>
        <NavLink to="admin" className="item">
          Add Book
        </NavLink>
        <div className="right menu">
          <button className="ui orange button item" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </>
    );
  } else if (isLoggedIn) {
    content = (
      <>
        <NavLink to="/home" className="item">
          Home
        </NavLink>
        <NavLink to="/library" className="item">
          Library
        </NavLink>
        <div className="right menu">
          <button className="ui orange button item" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </>
    );
  } else {
    content = (
      <div className="right menu">
        <NavLink to="/login" className="item">
          Login
        </NavLink>

        <NavLink to="/register" className="item">
          Register
        </NavLink>
      </div>
    );
  }

  return (
    <div className="ui massive menu">
      <div className="header item">
        <div className="ui left icon">
          <i className="book icon"></i>
        </div>
        College Library
      </div>
      {content}
    </div>
  );
};

export default Navigation;
