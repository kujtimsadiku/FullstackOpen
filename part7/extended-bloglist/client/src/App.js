import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import { blogService } from "./services/blogs";
import { loginService } from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch } from "react-redux";
import { showNotificationWithTimeout } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showNotificationWithTimeout("Wrong credentials", "error", 3));
    }
    console.log("Logging in with", username, password);
  };

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

      // Fetch the updated list of blogs from the server
      // const updatedBlogs = await blogService.getAll();
      // setBlogs([...updatedBlogs, newBlog]);

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
          <LoginForm
            username={username}
            password={password}
            handleUsername={({ target }) => setUsername(target.value)}
            handlePassword={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => blogFormRef.current.toggleVisibility()}>
            Cancel
          </button>
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      {user && (
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
      )}
    </div>
  );
};

export default App;
