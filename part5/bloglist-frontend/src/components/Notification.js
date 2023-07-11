const Notification = ({ message }) => {
  if (message === null)
    return null;
  
  return (
    <div className="error" style={{fontSize: "28px", color: "red"}}>
      {message}
    </div>
  );
}

export default Notification