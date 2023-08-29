import { useState } from "react";
import { useDispatch } from "react-redux";
import { blogToRemove, updateLike } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikes = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    };

    dispatch(updateLike(blog.id, blogToUpdate));
    // updateBlogLikes(blog.id, blogToUpdate);
  };

  const handleRemove = () => {
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`,
      )
    ) {
      try {
        dispatch(blogToRemove(blog));
      } catch (exception) {
        console.log("Error deleting " + exception);
      }
    } else return;
  };

  return (
    <div id="viewing-model">
      <div style={hideWhenVisible}>
        {/* { blog.title } - { blog.author } */}
        <span className="title">{blog.title}</span>
        <span> - </span>
        <span className="author">{blog.author}</span>
        <button id="view.btn" onClick={toggleVisibility} className="view-btn">
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} - {blog.author}
        <button id="hide.btn" onClick={toggleVisibility} className="hide-btn">
          hide
        </button>
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button id="like.btn" onClick={handleLikes} className="like-btn">
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
        </div>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default Blog;
