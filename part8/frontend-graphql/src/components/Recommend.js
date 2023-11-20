import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS } from "../queries";

const Recommend = ({ show, user }) => {
  const { favoriteGenre } = user.data.me;

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genres: favoriteGenre },
  });

  if (!show) return null;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <div>
        books in your favorite genre <strong>patterns</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data &&
            data.allBooks.map((book, i) =>
              book.genres.includes(favoriteGenre) ? (
                <tr key={book.title + i}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
