import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
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

  const handleBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();

    try {
      const blog = await blogService.create(newBlog);

      // Fetch the updated list of blogs from the server
      const updatedBlogs = await blogService.getAll();
      setBlogs([...updatedBlogs, blog]);

      setMessage(`A new blog ${blog.title} by ${blog.author}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (exception) {
      setErrorMessage("Error");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const updateBlogLikes = async (id, blog) => {
    try {
      const blogLiked = await blogService.update(id, blog);

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id ? { ...blog, likes: blogLiked.likes } : blog
        )
      );
    } catch (exception) {
      setErrorMessage("Error on updating likes");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  // Removes a blog
  const deleteBlog = async (blogToRemove) => {
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      try {
        await blogService.remove(blogToRemove.id);
        setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
      } catch (exception) {
        console.log("Error deleting " + exception);
      }
    } else return;
  };

  const blogFormRef = useRef();

  return (
    <div>
      {!user && (
        <Togglable btnName="Login" ref={blogFormRef}>
          <h2>Log in to application</h2>
          <Notification message={message} errorMessage={errorMessage} />
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
      )}
      {user && (
        <div>
          <h2>Blogs</h2>
          {loggedIn()}
          <Notification message={message} errorMessage={errorMessage} />
          <Togglable btnName="Create Blog" ref={blogFormRef}>
            <BlogForm createBlog={handleBlog} />
            <button
              onClick={() => blogFormRef.current.toggleVisibility()}
              className="cancel-btn">
              Cancel
            </button>
          </Togglable>
          {blogs
            .sort((min, max) => max.likes - min.likes)
            .map((blog) => {
              if (
                blog.user &&
                blog.user.username &&
                blog.user.username === user.username
              ) {
                return (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlogLikes={updateBlogLikes}
                    removeBlog={deleteBlog}
                  />
                );
              } else {
                return null;
              }
            })}
        </div>
      )}
    </div>
  );
};

export default App;
