import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="ui menu">
      <div className="header item">College Library</div>
      <div className="right item">
        <NavLink to="/login" className="item">
          Login
        </NavLink>
        <NavLink to="/register" className="item">
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
