import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  Diagnosis,
  Discharge,
  EntryWithoutID,
  HealthCheckRating,
  SickLeave,
} from "../../../types";
import { useContext, useState } from "react";
import { HospitalForm } from "./HospitalForm";
import { HealthCheckForm } from "./HealthCheckForm";
import { HealthCareForm } from "./HealthCareForm";
import DiagnosisContext from "../../../contexts/diagnosisContext";

interface Props {
  type: string;
  onCancel: () => void;
  onSubmit: (values: EntryWithoutID) => void;
}

export const BaseForm = ({ type, onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnoseCodes] = useState<Array<Diagnosis["code"]>>(
    []
  );
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState<string>("");
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });
  const codes = useContext(DiagnosisContext);

  const clearForm = (): void => {
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnoseCodes([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName("");
    setDischarge({
      date: "",
      criteria: "",
    });
    setSickLeave({
      startDate: "",
      endDate: "",
    });
  };

  const onDiagnoseChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();

    typeof event.target.value === "string"
      ? setDiagnoseCodes(event.target.value.split(", "))
      : setDiagnoseCodes(event.target.value);
  };

  const handleEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case "Hospital":
        onSubmit({ type: "Hospital", ...baseEntry, discharge });
        break;
      case "HealthCheck":
        console.log(healthCheckRating, "Boom");
        onSubmit({
          type: "HealthCheck",
          ...baseEntry,
          healthCheckRating,
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          type: "OccupationalHealthcare",
          ...baseEntry,
          employerName,
          sickLeave,
        });
        break;
      default:
        break;
    }
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
          type="date"
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
        <InputLabel>Diagnosis Code</InputLabel>
        <Select
          label="Diagnosis codes"
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnoseChange}
          input={<OutlinedInput label="Multiple Select" />}
        >
          {codes.map((code) => (
            <MenuItem key={code.code} value={code.code}>
              {code.code}
            </MenuItem>
          ))}
        </Select>
        {type === "Hospital" && (
          <HospitalForm discharge={discharge} setDischarge={setDischarge} />
        )}
        {type === "OccupationalHealthcare" && (
          <HealthCareForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        )}
        {type === "HealthCheck" && (
          <HealthCheckForm
            rating={healthCheckRating}
            setRating={setHealthCheckRating}
          />
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
          <Grid item>
            <Button
              style={{
                float: "left",
              }}
              type="button"
              color="secondary"
              variant="contained"
              onClick={clearForm}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
