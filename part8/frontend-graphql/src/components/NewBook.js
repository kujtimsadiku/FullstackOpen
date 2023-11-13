import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_BOOKS, CREATE_BOOK } from "../queries";

const NewBook = (props) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published: "",
    genres: [],
  });
  const [genre, setGenre] = useState("");

  const nullBook = { title: "", author: "", published: "", genres: [] };

  const [addBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        };
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const { title, author, published, genres } = book;

    try {
      const res = await addBook({
        variables: {
          title,
          author,
          published: parseInt(published),
          genres,
        },
      });
      console.log("res data", res.data);
    } catch (error) {
      console.log("Mutation Failed!", error);
    }
    setBook(nullBook);
    setGenre("");
  };

  const addGenre = (e) => {
    if (genre === "") return;

    setBook({
      ...book,
      [e.target.name]: book.genres.concat(genre),
    });

    setGenre("");
  };

  const handleBookChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="title">title</label>
          <input
            id="title"
            value={book.title}
            onChange={handleBookChange}
            name="title"
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            id="author"
            value={book.author}
            onChange={handleBookChange}
            name="author"
          />
        </div>
        <div>
          <label htmlFor="published">published</label>
          <input
            id="published"
            type="number"
            value={book.published}
            onChange={handleBookChange}
            name="published"
          />
        </div>
        <div>
          <label htmlFor="genre">genre</label>
          <input
            id="genre"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button" name="genres">
            add genre
          </button>
        </div>
        <div>genres: {book.genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
