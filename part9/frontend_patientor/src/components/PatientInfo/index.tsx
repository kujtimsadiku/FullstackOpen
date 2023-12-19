import React from "react";
import { Container, Typography } from "@mui/material";
import FemaleSharpIcon from "@mui/icons-material/FemaleSharp";
import MaleSharpIcon from "@mui/icons-material/MaleSharp";
import { Diagnosis, Patient } from "../../types";
import { useMatch } from "react-router-dom";
import { BulletCodeList } from "./listComponent";

interface Props {
  patients: Patient[];
  diagnosis: Diagnosis[];
}

const PatientInfo = ({ patients, diagnosis }: Props) => {
  const match = useMatch("/patients/:id");

  const patientByID = (id: string) => {
    const patient = patients.find((p) => p.id === id);

    return patient;
  };

  const isString = (params: unknown): params is string => {
    return typeof params === "string";
  };

  const parseID = (id: unknown): string => {
    if (!isString(id)) return ""; // no need to throw error since im checking if (patient)
    return id;
  };

  const patient = match ? patientByID(parseID(match.params.id)) : null;

  if (patient) {
    return (
      <Container style={{ paddingLeft: "0" }}>
        <Typography variant="h4" marginTop={"0.5em"}>
          {patient.name}
          {patient.gender === "female" && (
            <FemaleSharpIcon style={{ fontSize: 35 }} />
          )}
          {patient.gender === "male" && (
            <MaleSharpIcon style={{ fontSize: 35 }} />
          )}
        </Typography>
        <Typography>ssh: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        <Typography variant="h4" marginTop={"1em"}>
          entries
        </Typography>
        {patient.entries?.map((entry) => (
          <React.Fragment key={entry.id}>
            <Typography>
              {entry.date} {entry.description}
            </Typography>
            <BulletCodeList
              codes={entry.diagnosisCodes}
              diagnosis={diagnosis}
            />
          </React.Fragment>
        ))}
      </Container>
    );
  }

  return (
    <Typography variant="h4" style={{ fontWeight: "bold", marginTop: "0.5em" }}>
      No info found
    </Typography>
  );
};

export default PatientInfo;
