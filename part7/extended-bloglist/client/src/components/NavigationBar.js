import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../reducers/loginReducer";

const logUserOut = (dispatch) => {
  if (window.confirm("Do you want to log out")) {
    dispatch(logOut());
  }
};

const NavigationBar = () => {
  const dispatch = useDispatch();

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
        <li>
          <button
            className="logout-button"
            onClick={() => logUserOut(dispatch)}
          >
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
