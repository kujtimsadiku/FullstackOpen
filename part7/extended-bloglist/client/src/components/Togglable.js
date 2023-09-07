import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import BlogForm from "./BlogForm";

const Togglable = forwardRef(({ btnName }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className="create-new-button" onClick={toggleVisibility}>{btnName}</Button>
      </div>
      <div style={showWhenVisible} className="blogform-container">
        <BlogForm toggleVisibility={toggleVisibility} />
      </div>
    </div>
  );
});

Togglable.propTypes = {
  btnName: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
