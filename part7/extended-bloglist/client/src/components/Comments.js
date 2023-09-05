import React from "react";
import { Header } from "./Header";
import CommentForm from "./CommentForm";

const Comments = ({ blog }) => {
  return (
    <React.Fragment>
      <Header tag="h2" text="Comments" />
      <CommentForm blog={blog} />
    </React.Fragment>
  );
};

export default Comments;
