import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TableContainer,
  TableData,
  TableRow,
  Table,
  TableBody,
  TableHead,
} from "./Tables";

const Users = () => {
  const users = useSelector((state) => state.user);
  console.log(users);

  return (
    <>
      <h2>Users</h2>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableData>
              <strong>Names</strong>
            </TableData>
            <TableData>
              <strong>Blogs Created</strong>
            </TableData>
          </TableRow>
        </TableHead>
        <Table>
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
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
