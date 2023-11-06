import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_BIRTH } from "../queries";
import React, { useState } from "react";
import Select from "react-select";

// need to add the token for authentication to change the birthyear
// without it won't change

const UpdateBirth = () => {
  const [birth, setBirth] = useState("");
  const [value, setValue] = useState(null);

  const authors = useQuery(ALL_AUTHORS);
  console.log(authors.data.allAuthors);

  const [updateBirthyear] = useMutation(UPDATE_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
  };

  const submit = async (event) => {
    event.preventDefault();

    const { name } = value;
    await updateBirthyear({
      variables: { name, setBornTo: parseInt(birth, 10) },
    });

    setBirth("");
  };

  const options = authors.data.allAuthors.map((a) => ({
    name: a.name,
    label: a.name,
  }));

  return (
    <div>
      <h1>Set birthyear</h1>
      <form onSubmit={submit}>
        <Select options={options} value={value} onChange={handleSelect} />
        <label htmlFor="born">
          born
          <input
            value={birth}
            onChange={({ target }) => setBirth(target.value)}
          />
        </label>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBirth;
