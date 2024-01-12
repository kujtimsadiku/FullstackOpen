import { TextField } from "@mui/material";
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <TextField
        label="Sick Leave Start Day"
        fullWidth
        name="startDay"
        value={sickLeave.startDate}
        onChange={handleChange}
      />
      <TextField
        label="Sick Leave End Day"
        fullWidth
        name="endDay"
        value={sickLeave.endDate}
        onChange={handleChange}
      />
    </>
  );
};
