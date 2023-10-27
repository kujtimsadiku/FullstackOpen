import { useMutation } from "@apollo/client";
import { UPDATE_BIRTH } from "../queries";
import React, { useState } from "react";

const UpdateBirth = () => {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");

  const [updateBirthyear] = useMutation(UPDATE_BIRTH);

  const submit = async (event) => {
    event.preventDefault();

    await updateBirthyear({
      variables: { name, setBornTo: parseInt(birth, 10) },
    });
    setBirth("");
    setName("");
  };

  return (
    <div>
      <h1>Set birthyear</h1>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor="born">Born</label>
          <input
            id="born"
            type="number"
            value={birth}
            onChange={({ target }) => setBirth(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default UpdateBirth;
