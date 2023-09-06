import { useField } from "../hooks/index";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const logged = useSelector(({ login }) => login);

  const handleBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
    };

    dispatch(
      createBlog(newBlog, { username: logged.username, name: logged.name }),
    );

    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <div className="blogform-container">
      <h2 className="create-new-header">Create new</h2>
      <form onSubmit={handleBlog}>
        <div className="input-title">
          <input
            id="title-input"
            placeholder="Title..."
            required
            {...title.inputProps}
          />
        </div>
        <div className="input-author">
          <input
            id="author-input"
            placeholder="Author..."
            required
            {...author.inputProps}
          />
        </div>
        <div className="input-url">
          <input id="url-input" placeholder="URL..." {...url.inputProps} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
