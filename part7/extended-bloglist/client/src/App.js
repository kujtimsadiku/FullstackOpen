import { useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import { userService } from "./services/users";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { login, logOut } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector(({ login }) => login);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    const loggedUserJSON = userService.getLocalStorageUser();

    if (loggedUserJSON) {
      dispatch(login(loggedUserJSON));
      userService.setToken(loggedUserJSON.token);
    }
    // eslint-disable-next-line
  }, []);

  const logOutUser = () => {
    if (window.confirm("Do you want to log out")) {
      dispatch(logOut());
    }
  };

  const loggedIn = () => {
    return (
      <div className="loggedIn">
        {loginUser.name} is logged in
        <button onClick={logOutUser} className="loggedOut-btn">
          Logout
        </button>
      </div>
    );
  };

  const blogFormRef = useRef();

  if (loginUser === null) {
    return (
      <div>
        <Togglable btnName="Login" ref={blogFormRef}>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
          <button onClick={() => blogFormRef.current.toggleVisibility()}>
            Cancel
          </button>
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      {loggedIn()}
      <Notification />
      <Togglable btnName="Create Blog" ref={blogFormRef}>
        <BlogForm />
        <button
          onClick={() => blogFormRef.current.toggleVisibility()}
          className="cancel-btn"
        >
          Cancel
        </button>
      </Togglable>
      <Blogs username={loginUser.username} />
    </div>
  );
};

export default App;
