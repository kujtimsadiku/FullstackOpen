import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import { userService } from "./services/users";
import { loginService } from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { showNotificationWithTimeout } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  // const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = userService.getLocalStorageUser("loggedBlogappUser");

    if (loggedUserJSON) {
      dispatch(setUser(user));
    }
    // eslint-disable-next-line
  }, []);

  const logOut = () => {
    if (window.confirm("Do you want to log out")) {
      window.localStorage.clear("loggedBlogappUser");
      setUser(null);
    }
  };

  const loggedIn = () => {
    return (
      <div className="loggedIn">
        {user.name} is logged in
        <button onClick={logOut} className="loggedOut-btn">
          Logout
        </button>
      </div>
    );
  };

  const handleBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();

    try {
      dispatch(createBlog(newBlog));
      dispatch(
        showNotificationWithTimeout(
          `A new blog ${newBlog.title} by ${newBlog.author}`,
          "success",
          3,
        ),
      );
    } catch (exception) {
      dispatch(
        showNotificationWithTimeout(
          "Error trying to create new blog",
          "error",
          3,
        ),
      );
    }
  };

  const blogFormRef = useRef();

  if (!user) {
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
        <BlogForm createBlog={handleBlog} />
        <button
          onClick={() => blogFormRef.current.toggleVisibility()}
          className="cancel-btn"
        >
          Cancel
        </button>
      </Togglable>
      <Blogs username={user.username} />
    </div>
  );
};

export default App;
