import { Container, Select, SelectChangeEvent } from "@mui/material";
import { Entry, EntryWithoutID, TypeEntryForm } from "../../types";
import { useState } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutID) => void;
}

interface EntryType {
  type: Entry;
}

// const ChooseEntryForm = (entry: string) => {
//   switch (entry) {

//   }
// };

interface EntryOptions {
  value: TypeEntryForm;
  label: string;
}

const entryOptions: EntryOptions[] = Object.values(TypeEntryForm).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<TypeEntryForm>();

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(TypeEntryForm).find(
        (e) => e.toString() === value
      );
      if (type) {
        setType(type);
      }
    }
  };

  return (
    <Container>
      <Select label="type" fullWidth value={type} onChange={onTypeChange}>
        {entryOptions.map((option) => )}
      </Select>
    </Container>
  );
};

export default AddEntryForm;
