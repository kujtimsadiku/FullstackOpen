import { List, ListItem, Typography } from "@mui/material";
import { Diagnosis, Patient } from "../../types";
import FemaleSharpIcon from "@mui/icons-material/FemaleSharp";
import MaleSharpIcon from "@mui/icons-material/MaleSharp";
import React from "react";

interface PatientProp {
  patient: Patient | undefined;
}

interface DiagnoseProp {
  diagnosis: Diagnosis[];
}

interface ListProps extends PatientProp, DiagnoseProp {}

interface CodeProp {
  codes: string[];
}

interface BulletCodeListProps extends DiagnoseProp, CodeProp {}

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
      return;
  }
};

const BulletCodeList = ({ codes, diagnosis }: BulletCodeListProps) => {
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

export const ShowEntries = ({ diagnosis, patient }: ListProps) => {
  return (
    <>
      {patient?.entries?.map((entry) => (
        <React.Fragment key={entry.id}>
          <Typography>
            {entry.date} {entry.description}
          </Typography>
          {entry.diagnosisCodes && (
            <BulletCodeList
              codes={entry.diagnosisCodes}
              diagnosis={diagnosis}
            />
          )}
          <Typography>diagnose by {entry.specialist}</Typography>
        </React.Fragment>
      ))}
    </>
  );
};
