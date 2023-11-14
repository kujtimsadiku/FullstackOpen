import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, CURRENT_USER } from "../queries";

const Recommend = (props) => {
  const currentUser = useQuery(CURRENT_USER);
  const { loading, error, data } = useQuery(ALL_BOOKS);
  console.log(data.allBooks);
  console.log(currentUser);

  if (!props.show) return null;

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
            {data.allBooks.map((book) =>
              book.genres.includes(currentUser.favoriteGenre) ? (
                <tr>

                <td key={book.title}></td>
              ) : null
                </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
