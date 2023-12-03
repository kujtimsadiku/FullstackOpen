const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  if (!errorMessage) return null;

  return (
    <div className="border border-red-500">
      <div className="text-red-500">{errorMessage}</div>
    </div>
  );
};

export default ErrorMessage;
