import { ALL_AUTHORS, COUNT_AUTHOR_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Authors = (props) => {
  const [authorToSearch, setAuthorToSearch] = useState("");
  const authors = useQuery(ALL_AUTHORS);
  const bookCount = useQuery(COUNT_AUTHOR_BOOKS, {
    variables: authorToSearch,
    skip: !authorToSearch,
  });

  if (authors.loading) {
    return <div>Loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
