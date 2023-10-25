import React, { useEffect, useRef } from "react";
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
import { login } from "./reducers/loginReducer";
import { Route, Routes } from "react-router-dom";
import User from "./components/User";
import Blog from "./components/Blog";
import NavigationBar from "./components/NavigationBar";
import { Header } from "./components/Header";
import Greetings from "./components/Greetings";

const App = () => {
  const dispatch = useDispatch();
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

  if (loginUser === null) {
    return (
      <div className="login-container">
        <LoginForm />
      </div>
    );
  }

  const Home = () => {
    return (
      <React.Fragment>
        <Togglable btnName="Create new" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
        <Blogs />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="content-img">
        <div className="content-wrapper">
          <Header tag="h1" text="Blogs" className="header-home"></Header>
          <Greetings />
          <Notification />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
