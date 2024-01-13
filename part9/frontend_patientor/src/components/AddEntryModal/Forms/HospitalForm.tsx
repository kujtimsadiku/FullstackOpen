import { TextField } from "@mui/material";
import { Discharge } from "../../../types";
import React from "react";

interface Props {
  discharge: Discharge;
  setDischarge: React.Dispatch<React.SetStateAction<Discharge>>;
}

export const HospitalForm = ({ discharge, setDischarge }: Props) => {
  const handleDischarge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDischarge({
      ...discharge,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <TextField
        type="date"
        fullWidth
        value={discharge.date}
        name="date"
        onChange={handleDischarge}
      />
      <TextField
        label="Discharge Criteria"
        fullWidth
        value={discharge.criteria}
        name="criteria"
        onChange={handleDischarge}
      />
    </>
  );
};
