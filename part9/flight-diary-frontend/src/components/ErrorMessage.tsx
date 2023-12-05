const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  if (!errorMessage) return null;

  return (
    <div>
      <div>{errorMessage}</div>
    </div>
  );
};

export default ErrorMessage;
