import { Button, Grid, TextField } from "@mui/material";
import {
  Diagnosis,
  Discharge,
  EntryWithoutID,
  SickLeave,
} from "../../../types";
import { useState } from "react";
import { HospitalForm } from "./HospitalForm";
import { HealthCheckForm } from "./HealthCheckForm";
import { HealthCareForm } from "./HealthCareForm";

interface Props {
  type: string;
  onCancel: () => void;
  onSubmit: (values: EntryWithoutID) => void;
  diagnosis: Diagnosis[];
}

export const BaseForm = ({ type, onCancel, onSubmit, diagnosis }: Props) => {
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnose, setDiagnose] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [entry, setEntry] = useState<EntryWithoutID>();
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });

  // function maybe to handle the type checking or guarding
  function CorrectEntry(entryForm: EntryWithoutID): EntryWithoutID {
    switch (type) {
      case "Hospital":
        return;
    }
  }

  // here you need to create a handler for form (handle diagnoses, discharge, sickleave and rating)

  const handleEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diagnosisCodes: Array<Diagnosis["code"]> | undefined = diagnose
      .split(",")
      .map((d) => d.trim());

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    const entryToSubmit: EntryWithoutID = CorrectEntry(baseEntry);
  };

  return (
    <div>
      <form onSubmit={handleEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnose Codes"
          fullWidth
          value={diagnose}
          onChange={({ target }) => setDiagnose(target.value)}
        />
        {type === "Hospital" && (
          <HospitalForm discharge={discharge} setDischarge={setDischarge} />
        )}
        {type === "HealthCheck" && (
          <HealthCareForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        )}
        {type === "OccupationalHealthcare" && (
          <HealthCheckForm rating={rating} setRating={setRating} />
        )}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
