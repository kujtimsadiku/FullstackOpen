import React from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" activeclassname="active">
            Blogs
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" activeclassname="active">
            Users
          </NavLink>
        </li>
      </ul>
      <p>Log Out</p>
    </nav>
  );
};

export default NavigationBar;
