import { NewPatientEntry } from "../../types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  const newEntry: NewPatientEntry = object as NewPatientEntry;

  return newEntry;
};

export default toNewPatientEntry;
