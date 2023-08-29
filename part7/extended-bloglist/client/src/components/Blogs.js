import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = ({ username }) => {
  const blogs = useSelector(({ blog }) => blog);

  console.log(blogs);
  return blogs
    .slice()
    .sort((min, max) => max.likes - min.likes)
    .map((blog) => {
      if (blog.user && blog.user.username && blog.user.username === username) {
        return <Blog key={blog.id} blog={blog} />;
      } else {
        return null;
      }
    });
};

export default Blogs;
