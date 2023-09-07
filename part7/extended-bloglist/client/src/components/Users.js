import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TableContainer,
  TableData,
  TableRow,
  TableBody,
  TableHead,
} from "./Tables";
import React from "react";
import { Header } from "./Header";

const Users = () => {
  const users = useSelector((state) => state.user);

  console.log("users sets:", users);

  return (
    <React.Fragment>
      <div className="users-container">
      <Header tag="h2" text="Users" className="header-home header-user"/>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableData>
              <p>Blogs Created</p>
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
      </div>
    </React.Fragment>
  );
};

export default Users;
