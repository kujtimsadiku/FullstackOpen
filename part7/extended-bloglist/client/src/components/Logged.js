import { logOut } from "../reducers/loginReducer";

const logOutUser = (dispatch) => {
  if (window.confirm("Do you want to log out")) {
    dispatch(logOut());
  }
};

const Logged = ({ name, dispatch }) => {
  return (
    <div className="loggedIn">
      {name} is logged in
      <div>
        <button onClick={() => logOutUser(dispatch)} className="loggedOut-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logged;
