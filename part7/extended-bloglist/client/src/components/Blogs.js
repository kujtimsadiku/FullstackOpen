import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <div className="blog-container">
      {blogs
        .slice()
        .sort((min, max) => max.likes - min.likes)
        .map((blog) => (
          <div className="blog-title" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  );
};

export default Blogs;
