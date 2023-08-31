import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = ({ username }) => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <>
      {blogs
        .slice()
        .sort((min, max) => max.likes - min.likes)
        .map((blog) =>
          blog.user ? (
            blog.user.username === username ? (
              <Blog key={blog.id} blog={blog} />
            ) : null
          ) : null,
        )}
    </>
  );
};

export default Blogs;
