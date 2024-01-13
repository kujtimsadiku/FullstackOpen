import { Container, List, ListItem, Typography } from "@mui/material";
import { Entry, Patient } from "../../types";
import FemaleSharpIcon from "@mui/icons-material/FemaleSharp";
import MaleSharpIcon from "@mui/icons-material/MaleSharp";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded"; //health check
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded"; // hospital
import MedicalInformationRoundedIcon from "@mui/icons-material/MedicalInformationRounded"; // healthcare
import FavoriteIcon from "@mui/icons-material/Favorite"; // for health check
import { useContext } from "react";
import DiagnosisContext from "../../contexts/diagnosisContext";

interface PatientProp {
  patient: Patient;
}

interface ListProps extends PatientProp {}

interface CodeProp {
  codes: string[];
}

interface BulletCodeListProps extends CodeProp {}

type Diagnose = {
  code: string;
  name: string;
  lating?: string;
};

export const ShowGender = ({ gender }: { gender: string }) => {
  switch (gender) {
    case "male":
      return <MaleSharpIcon style={{ fontSize: 35 }} />;
    case "female":
      return <FemaleSharpIcon style={{ fontSize: 35 }} />;
    default:
      return null;
  }
};

const HealthRatingCheck = ({ rating }: { rating: number }) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon sx={{ color: "green" }} />;
    case 1:
      return <FavoriteIcon sx={{ color: "yellow" }} />;
    case 2:
      return <FavoriteIcon sx={{ color: "orange" }} />;
    case 3:
      return <FavoriteIcon sx={{ color: "red" }} />;
    default:
      return null;
  }
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <>
          <Typography>
            {entry.date} <HealthAndSafetyRoundedIcon sx={{ color: "black" }} />
          </Typography>
        </>
      );
    case "HealthCheck":
      return (
        <>
          <Typography>
            {entry.date} <MonitorHeartRoundedIcon sx={{ color: "black" }} />
          </Typography>
          <Typography>{entry.description}</Typography>
          <HealthRatingCheck rating={entry.healthCheckRating} />
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Typography>
            {entry.date}{" "}
            <MedicalInformationRoundedIcon sx={{ color: "black" }} />
          </Typography>
        </>
      );
    default:
      assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const BulletCodeList = ({ codes }: BulletCodeListProps) => {
  const diagnosis = useContext(DiagnosisContext);

  const diagnoseChecker = (code: string): string | undefined => {
    const found_diagnose: Diagnose | undefined = diagnosis?.find(
      (diagnose) => diagnose.code === code
    );

    return found_diagnose?.name;
  };

  return (
    <List sx={{ listStyleType: "disc", listStylePosition: "inside" }}>
      {codes.map((code, index) => (
        <ListItem key={code + " " + index} sx={{ display: "list-item" }}>
          {code} {diagnoseChecker(code)}
        </ListItem>
      ))}
    </List>
  );
};

export const ShowEntries = ({ patient }: ListProps) => {
  const styleContainer = {
    border: "2px solid black",
    borderRadius: "10px",
    margin: "10px 0px",
  };

  return (
    <>
      {patient.entries?.map((entry) => (
        <Container
          key={entry.id}
          sx={styleContainer}
          style={{ paddingLeft: "10px" }}
        >
          <EntryDetails entry={entry} />
          {entry.diagnosisCodes && (
            <BulletCodeList codes={entry.diagnosisCodes} />
          )}
          <Typography>diagnose by {entry.specialist}</Typography>
        </Container>
      ))}
    </>
  );
};
