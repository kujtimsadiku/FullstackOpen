import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <div>
      {blogs
        .slice()
        .sort((min, max) => max.likes - min.likes)
        .map((blog) => (
          <div className="container" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  );
};

export default Blogs;
