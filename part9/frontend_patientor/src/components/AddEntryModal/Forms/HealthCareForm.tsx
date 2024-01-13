import { InputLabel, TextField } from "@mui/material";
import { SickLeave } from "../../../types";
import React from "react";

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: SickLeave;
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>;
}

export const HealthCareForm = ({
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave,
}: Props) => {
  const handleSickLeaveChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSickLeave({
      ...sickLeave,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <TextField
        label="Employer Name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel>Sick Leave Start Date</InputLabel>
      <TextField
        fullWidth
        type="date"
        name="startDate"
        value={sickLeave.startDate}
        onChange={handleSickLeaveChange}
      />
      <InputLabel>Sick Leave End Date</InputLabel>
      <TextField
        type="date"
        fullWidth
        name="endDate"
        value={sickLeave.endDate}
        onChange={handleSickLeaveChange}
      />
    </>
  );
};
