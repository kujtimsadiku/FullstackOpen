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
      <TextField
        label="Sick Leave Start Date"
        fullWidth
        name="startDate"
        placeholder="YYYY-MM-DD"
        value={sickLeave.startDate}
        onChange={handleSickLeaveChange}
      />
      <TextField
        label="Sick Leave End Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        name="endDate"
        value={sickLeave.endDate}
        onChange={handleSickLeaveChange}
      />
    </>
  );
};
