import { useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import { userService } from "./services/users";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { login, logOut } from "./reducers/loginReducer";
import { useMatch, Route, Routes } from "react-router-dom";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const dispatch = useDispatch();
  const match = useMatch("/blogs/:id"); // also need for /users or /users/:id i need to find better solution
  const blogFormRef = useRef();
  const loginUser = useSelector(({ login }) => login);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
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
        <div>
          <button onClick={logOutUser} className="loggedOut-btn">
            Logout
          </button>
        </div>
      </div>
    );
  };

  const Container = (props) => {
    return <div className="table-container">{props.children}</div>;
  };

  if (loginUser === null) {
    return (
      <Container>
        <Togglable btnName="Login" ref={blogFormRef}>
          <LoginForm />
          <button onClick={() => blogFormRef.current.toggleVisibility()}>
            Cancel
          </button>
        </Togglable>
      </Container>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      {loggedIn()}
      <Notification />
      {!match ? (
        <Togglable btnName="Create Blog" ref={blogFormRef}>
          <BlogForm />
          <button
            onClick={() => blogFormRef.current.toggleVisibility()}
            className="cancel-btn"
          >
            Cancel
          </button>
        </Togglable>
      ) : null}
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
