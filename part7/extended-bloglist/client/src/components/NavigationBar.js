import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../reducers/loginReducer";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logUserOut = (dispatch) => {
    if (window.confirm("Do you want to log out")) {
      dispatch(logOut());
      navigate('/');
    }
  };

  return (
    <nav className="nav-bar">
      <ul className="unorder-list">
        <li className="list">
          <NavLink to="/" activeclassname="active">
            Blogs
          </NavLink>
        </li>
        <li className="list">
          <NavLink to="/users" activeclassname="active">
            Users
          </NavLink>
        </li>
        <li className="list">
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
