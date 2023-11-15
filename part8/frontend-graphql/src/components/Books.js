import { useMutation, useQuery } from "@apollo/client";
import { ALL_BOOKS, REMOVE_BOOK } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState("all genres");
  const { data } = useQuery(ALL_BOOKS, {
    variables: { filter },
  });

  const [removeBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  });

  if (!props.show) {
    return null;
  }

  const mapGenres = data.allBooks.map((g) => g.genres).flat();

  const duplicateGenres = new Set(
    mapGenres.map((genre) => genre.toLowerCase())
  );

  const genres = Array.from(duplicateGenres).map((genre) =>
    genre === "sci-fi"
      ? "Sci-Fi"
      : genre.charAt(0).toUpperCase() + genre.slice(1)
  );
  genres.push("all genres");

  // check if the selected filter is with "Sci-Fi" and just to check that if the book
  // has a smaller case "sci-fi"
  const filteredBook = data.allBooks.filter((book) =>
    filter === "all genres"
      ? book
      : filter.toLowerCase() === "sci-fi"
      ? book.genres.includes("Sci-Fi") || book.genres.includes("sci-fi")
      : book.genres.includes(filter)
  );

  const removeHandler = async (book) => {
    console.log("id:", book.id);
    try {
      console.log(book);
      const removedBook = await removeBook({
        variables: { id: book.id },
      });
      console.log(removedBook);
    } catch (error) {
      console.log("error removing", error);
    }
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBook &&
            filteredBook.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                <td>
                  <button onClick={() => removeHandler(a)}>delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre, i) => (
          <button onClick={() => setFilter(genre)} key={genre + i}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
