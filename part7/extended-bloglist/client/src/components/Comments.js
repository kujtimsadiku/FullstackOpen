import React from "react";
import { useField } from "../hooks";
import { Header } from "./Header";

const Comments = () => {
  const comment = useField();

  return (
    <React.Fragment>
      <Header tag="h2" text="Comments" />
    </React.Fragment>
  );
};

export default Comments;
