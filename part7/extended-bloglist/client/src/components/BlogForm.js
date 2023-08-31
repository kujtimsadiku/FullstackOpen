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
    <div>
      <div>
        <h2>Create new</h2>
        <form onSubmit={handleBlog}>
          <div>
            title:
            <input id="title-input" {...title.inputProps} />
          </div>
          <div>
            author:
            <input id="author-input" {...author.inputProps} />
          </div>
          <div>
            url:
            <input id="url-input" {...url.inputProps} />
          </div>
          <button className="create-btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
