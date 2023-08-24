// Delete button will be added. I need to figure out where i call update
// for updated blogs to be removed without refreshing the page.
// solution is to update the useState
import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlogLikes, removeBlog }) => {
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

    updateBlogLikes(blog.id, blogToUpdate);
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
        <button onClick={() => removeBlog(blog)}>Remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  updateBlogLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
