import React, { useState } from "react";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published: 0,
    genre: [],
  });

  const handleBookChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setBook(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title</label>
          <input
            type="text"
            value={book.title}
            onChange={handleBook}
            name="title"
          />
        </div>
        <div>
          <label>author</label>
          <input
            type="text"
            value={book.author}
            onChange={handleBook}
            name="author"
          />
        </div>
        <div>
          <label>published</label>
          <input
            type="number"
            value={book.published}
            onChange={handleBook}
            name="published"
          />
        </div>
        <div>
          <label>genre</label>
          <input
            type="text"
            value={book.genre}
            onChange={handleBook}
            name="genre"
          />
          <button onClick={() => set}></button>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddBook;
