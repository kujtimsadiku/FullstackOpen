import React, { useState } from "react";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published: 0,
    genre: [],
  });

  const handleBook = () => {};

  return (
    <div>
      <div>
        <label>title</label>
      </div>
      <div>
        <label>author</label>
      </div>
      <div>
        <label>published</label>
      </div>
      <div>
        <label>title</label>
        <input type="text" />
        <button onClick={() => set}></button>
      </div>
    </div>
  );
};

export default AddBook;
