import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TableContainer,
  TableData,
  TableRow,
  TableBody,
  TableHead,
} from "./Tables";
import { Header } from "./Header";

const Users = () => {
  const users = useSelector((state) => state.user);

  console.log("users sets:", users);

  return (
    <>
      <Header tag="h2" text="Users" />
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
