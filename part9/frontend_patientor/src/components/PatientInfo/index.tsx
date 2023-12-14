import { Container, Typography } from "@mui/material";
import { PatientFormValues, Patient } from "../../types";
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

  const patient = match ? patientByID(match.params.id as string) : null;

  if (patient) {
    return (
      <Container>
        <Typography>{patient.name}</Typography>
      </Container>
    );
  }

  return <div>No info found</div>;
};

export default PatientInfo;
