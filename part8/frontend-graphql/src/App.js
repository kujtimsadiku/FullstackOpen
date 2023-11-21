import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import { ALL_BOOKS, BOOK_ADDED, CURRENT_USER } from "./queries";
import Notify from "./components/Notify";
// import { Route, Routes } from "react-router-dom";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (b) => {
    let seen = new Set();
    return b.filter((item) => {
      let t = item.title;
      return seen.has(t) ? false : seen.add(t);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};
const App = () => {
  const [page, setPage] = useState("home");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useQuery(CURRENT_USER, {
    fetchPolicy: "network-only",
  });

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      notify(`${addedBook.title} added`);

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 6000);
  };

  if (user.loading) return <div>Loading...</div>;
  if (user.error) return <div>Error: {user.error}</div>;

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

      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add book"} />
      <Recommend show={page === "recommend"} user={user} />
    </div>
  );
};

export default App;
