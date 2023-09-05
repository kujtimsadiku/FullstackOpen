import { useField } from "../hooks";

const InputForm = ({ id, type }) => {
  const inputField = useField(type);

  return (
    <div>
      <input {...inputField.inputProps} />
    </div>
  );
};

export default InputForm;
