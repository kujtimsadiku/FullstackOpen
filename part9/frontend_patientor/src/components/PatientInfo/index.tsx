import { Container, Typography } from "@mui/material";
import FemaleSharpIcon from "@mui/icons-material/FemaleSharp";
import MaleSharpIcon from "@mui/icons-material/MaleSharp";
import { Patient } from "../../types";
import { useMatch } from "react-router-dom";

interface Props {
  patients: Patient[];
}

const PatientInfo = ({ patients }: Props) => {
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
  console.log(patient);

  if (patient) {
    return (
      <Container style={{ paddingLeft: "0" }}>
        <Typography variant="h4" fontWeight={"bold"} marginTop={"0.5em"}>
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
