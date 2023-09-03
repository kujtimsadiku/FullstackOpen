import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TableContainer,
  TableData,
  TableRow,
  TableBody,
  TableHead,
} from "./Tables";

const Users = () => {
  const users = useSelector((state) => state.user);

  console.log("users sets:", users);

  return (
    <>
      <h2>Users</h2>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableData></TableData>
            <TableData>
              <strong>Blogs Created</strong>
            </TableData>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableData>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableData>
              <TableData>{user.blogs.length}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
};

export default Users;
