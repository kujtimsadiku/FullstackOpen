import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, CURRENT_USER } from "../queries";

const Recommend = (props) => {
  const currentUser = useQuery(CURRENT_USER);
  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (!props.show) return null;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredBook = data.allBooks.filter((book) =>
    book.genres.includes(currentUser.favoriteGenre)
  );

  console.log("me", currentUser);
  console.log(data.allBooks);
  console.log(filteredBook);

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
          {filteredBook.map((book) => (
            <tr>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
