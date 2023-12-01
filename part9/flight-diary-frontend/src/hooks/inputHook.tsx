import { useEffect, useState } from "react";
import { ChangeEvent, ValueTypes, FormField } from "../../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

const parseType = (type: unknown): string | number => {
  if (isString(type)) {
    return type as string;
  } else if (isNumber(type)) {
    return type as number;
  }

  throw new Error("Incorrect or missing type");
};

const parseDefault = (type: unknown): ValueTypes => {
  if (isString(type)) {
    return "";
  } else if (isNumber(type)) {
    return 0;
  }

  throw new Error("Incorrect or missing type");
};

export const useField = (type: ValueTypes): FormField => {
  const [value, setValue] = useState<ValueTypes>(parseDefault(type));

  // for checking that variable value has some data in and to check reset works
  // useEffect(() => {
  //   console.log("the value: ", value);
  // }, [value]);

  const onChange = (event: ChangeEvent): void => {
    setValue(event.target.value);
  };

  const onReset = (): void => {
    setValue(parseDefault(type));
  };

  const inputProps: FormField = {
    value: value,
    inputProps: {
      inputType: type,
      value: value,
      onChange,
    },
    onReset,
  };

  return inputProps;
};
