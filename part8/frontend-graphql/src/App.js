import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
// import { Route, Routes } from "react-router-dom";

const App = () => {
  const [page, setPage] = useState("home");
  const [token, setToken] = useState("");
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <LoginForm setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add book")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add book"} />
      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
