import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Togglable = forwardRef(({ children, btnName }, ref) => {
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
        <Button onClick={toggleVisibility}>{btnName}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button className="" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  btnName: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
