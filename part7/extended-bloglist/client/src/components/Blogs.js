import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <>
      {blogs
        .slice()
        .sort((min, max) => max.likes - min.likes)
        .map((blog) => (
          <div className="container" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </>
  );
};

export default Blogs;
