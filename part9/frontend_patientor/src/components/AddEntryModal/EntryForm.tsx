import {
  Container,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { EntryWithoutID, TypeEntryForm } from "../../types";
import { useState } from "react";
import { BaseForm } from "./Forms/BaseForm";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutID) => void;
}

interface EntryOptions {
  value: TypeEntryForm;
  label: string;
}

interface ChoosedEntryFormProps extends Props {
  entry: string;
}

const ChoosedEntryForm = ({
  entry,
  onCancel,
  onSubmit,
}: ChoosedEntryFormProps) => {
  switch (entry) {
    case "Hospital":
      return (
        <BaseForm type="Hospital" onCancel={onCancel} onSubmit={onSubmit} />
      );
    case "HealthCheck":
      return (
        <BaseForm type="HealthCheck" onCancel={onCancel} onSubmit={onSubmit} />
      );
    case "OccupationalHealthcare":
      return (
        <BaseForm
          type="OccupationalHealthcare"
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      );
    default:
      return;
  }
};

const entryOptions: EntryOptions[] = Object.values(TypeEntryForm).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<TypeEntryForm>(TypeEntryForm.HospitalType);

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
      <InputLabel style={{ marginTop: 20 }}>Visit Type</InputLabel>
      <Select fullWidth value={type} onChange={onTypeChange}>
        {entryOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <ChoosedEntryForm entry={type} onSubmit={onSubmit} onCancel={onCancel} />
    </Container>
  );
};

export default AddEntryForm;
