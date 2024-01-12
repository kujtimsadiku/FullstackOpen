import { TextField } from "@mui/material";
import { Diagnosis, EntryWithoutID, SickLeave } from "../../../types";
import { useState } from "react";
import { HospitalForm } from "./HospitalForm";

interface Props {
  type: string;
  onCancel: () => void;
  onSubmit: (values: EntryWithoutID) => void;
  diagnosis: Diagnosis[];
}

export const BaseForm = ({ type, onCancel, onSubmit, diagnosis }: Props) => {
  const [date, setDate] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [specialist, setSpecialist] = useState<string>();
  const [diagnose, setDiagnose] = useState<string>();
  const [rating, setRating] = useState<string>();
  const [dischargeDate, setDischargeDate] = useState<string>();
  const [criteria, setDischargeCriteria] = useState<string>();
  const [employerName, setEmployerName] = useState<string>();
  const [sickLeave, setSickLeave] = useState<SickLeave>();

  // here you need to create a handler for form (handle diagnoses, discharge, sickleave and rating)

  return (
    <div>
      <form>
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
        {type === "Hospital" && <HospitalForm />}
        {type === "HealthCare" && <HospitalForm />}
        {type === "OccupationalHealthcare" && <HospitalForm />}
      </form>
    </div>
  );
};
