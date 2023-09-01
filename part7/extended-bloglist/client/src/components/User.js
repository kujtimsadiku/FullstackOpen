import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableContainer from "./TableContainer";

const Users = () => {
  const users = useSelector((state) => state.user);
  console.log(users);

  return (
    <>
      <h2>Users</h2>
      <TableContainer>
        <table>
          <tr>
            <td></td>
            <td>
              <strong>Blogs Created</strong>
            </td>
          </tr>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td colSpan={1}>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </>
  );
};

export default Users;
