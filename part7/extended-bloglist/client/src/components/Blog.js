import { useDispatch, useSelector } from "react-redux";
import { blogToRemove, updateLike } from "../reducers/blogReducer";
import { useNavigate, useParams } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.login);
  const blog = useSelector((state) => {
    return state.blogs.find((b) => b.id === id);
  });
  const navigate = useNavigate();

  if (!blog) return;

  const handleLikes = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 };

    dispatch(updateLike(blog.id, blogToUpdate));
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(blogToRemove(blog));
      navigate("/");
    }
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        Likes: {blog.likes}
        {user.username === blog.user.username && (
          <button
            id="like.btn"
            onClick={() => handleLikes()}
            className="like-btn"
          >
            like
          </button>
        )}
      </div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username && (
        <div>
          <button onClick={() => handleRemove()}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
