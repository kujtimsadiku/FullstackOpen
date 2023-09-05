const Button = ({ onClick, className, children, id, type }) => {
  return (
    <button
      onClick={onClick}
      className={className ? className : null}
      type={type ? type : null}
      id={id ? id : null}
    >
      {children}
    </button>
  );
};

export default Button;
