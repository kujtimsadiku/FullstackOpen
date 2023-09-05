import React from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import Button from "./Button";
import { createComment } from "../reducers/blogReducer";

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();
  const commentInput = useField("text");

  const handleComment = (event) => {
    event.preventDefault();
    commentInput.reset();

    if (!commentInput.value) return;

    dispatch(createComment(blog.id, { comments: commentInput.value }));
  };
  return (
    <React.Fragment>
      <form onSubmit={handleComment}>
        <input id="comment-input" {...commentInput.inputProps} />
        <Button type="submit">add comment</Button>
        {blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((cmt, index) => (
              <li key={index}>{cmt}</li>
            ))}
          </ul>
        ) : (
          <p>No comments</p>
        )}
      </form>
    </React.Fragment>
  );
};

export default CommentForm;
