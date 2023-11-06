import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import { useApolloClient } from "@apollo/client";
// import { Route, Routes } from "react-router-dom";
// import { authorService } from "./service/author";

const App = () => {
  const [page, setPage] = useState("home");
  const [token, setToken] = useState("");
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>login</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <Login show={page === "login"} />
    </div>
  );
};

export default App;
