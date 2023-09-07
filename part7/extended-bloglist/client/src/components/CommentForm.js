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
    <div className="comment-wrapper">
      <form onSubmit={handleComment}>
        <div className="comment-container">
          <input className="comment-input" placeholder="add comment" {...commentInput.inputProps} required />
          <Button type="submit" className="comment-button">{!commentInput.value ? <i class='bx bx-message-square-add'></i> : <i class='bx bx-message-square-add bx-tada' ></i>}</Button>
        </div>
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
    </div>
  );
};

export default CommentForm;
