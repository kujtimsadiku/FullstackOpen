import {
  Container,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { EntryWithoutID, TypeEntryForm } from "../../types";
import { useState } from "react";
import { HospitalForm } from "./Forms/HospitalForm";
import { HealthCheckForm } from "./Forms/HealthCheck";
import { HealthCareForm } from "./Forms/HealthCareForm";

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

const ChoosedEntryForm = (props: ChoosedEntryFormProps) => {
  console.log(props.entry);
  switch (props.entry) {
    case "Hospital":
      return (
        <HospitalForm onCancel={props.onCancel} onSubmit={props.onSubmit} />
      );
    case "HealthCheck":
      return (
        <HealthCheckForm onCancel={props.onCancel} onSubmit={props.onSubmit} />
      );
    case "OccupationalHealthcare":
      return (
        <HealthCareForm onCancel={props.onCancel} onSubmit={props.onSubmit} />
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
      <Select label="type" fullWidth value={type} onChange={onTypeChange}>
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
