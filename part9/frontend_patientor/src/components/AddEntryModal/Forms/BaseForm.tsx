import { Button, TextField } from "@mui/material";
import { Diagnosis } from "../../../types";

interface Props {
  description: string;
  date: string;
  specialist: string;
  diagnosis: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  setDiagnosis: React.Dispatch<React.SetStateAction<string>>;
  setDiagnosisCodes: React.Dispatch<
    React.SetStateAction<Array<Diagnosis["code"]>>
  >;
}

export const BaseForm = (props: Props) => {
  return (
    <>
      <TextField
        label="Description"
        fullWidth
        value={props.description}
        onChange={({ target }) => props.setDescription(target.value)}
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={props.date}
        onChange={({ target }) => props.setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={props.specialist}
        onChange={({ target }) => props.setSpecialist(target.value)}
      />
      <TextField
        label="Codes"
        fullWidth
        value={props.diagnosis}
        onChange={({ target }) => props.setDiagnosis(target.value)}
      />
      <Button
        color="secondary"
        variant="contained"
        style={{ float: "left" }}
        type="button"
        onClick={() =>
          props.setDiagnosisCodes((prev) => [...prev, props.diagnosis])
        }
      >
        Add
      </Button>
    </>
  );
};
