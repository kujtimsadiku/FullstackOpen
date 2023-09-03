import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "./Header";

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.find((u) => u.id === id));

  if (!user) return;

  return (
    <div>
      <Header tag="h2" text={user.name} />
      <strong>added blogs</strong>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
