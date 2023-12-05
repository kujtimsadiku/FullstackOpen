import { useState } from "react";
// import { useEffect } from "react";
import { ChangeEvent, FormField } from "../../types";

export const useField = (type: string): FormField => {
  // we will handle the number with parseInt()
  const [value, setValue] = useState("");

  // for checking that variable value has some data in and to check reset works
  // useEffect(() => {
  //   console.log("the value: ", value);
  // }, [value]);

  const onChange = (event: ChangeEvent): void => {
    console.log(event.target);
    setValue(event.target.value);
  };

  const onReset = (): void => {
    setValue("");
  };

  const inputProps: FormField = {
    value: value,
    inputProps: {
      type: type,
      value: value,
      onChange,
    },
    onReset,
  };

  return inputProps;
};
