import { List, ListItem } from "@mui/material";
import { Diagnosis } from "../../types";

interface CodeListProps {
  codes?: string[];
  diagnosis: Diagnosis[];
}

type Diagnose = {
  code: string;
  name: string;
  lating?: string;
};

export const BulletCodeList = ({ codes, diagnosis }: CodeListProps) => {
  const diagnoseChecker = (code: string): string | undefined => {
    const found_diagnose: Diagnose | undefined = diagnosis?.find(
      (diagnose) => diagnose.code === code
    );

    console.log(found_diagnose);
    return found_diagnose?.name;
  };

  return (
    <List sx={{ listStyleType: "disc", listStylePosition: "inside" }}>
      {codes?.map((code, index) => (
        <ListItem key={code + " " + index} sx={{ display: "list-item" }}>
          {code} {diagnoseChecker(code)}
        </ListItem>
      ))}
    </List>
  );
};
