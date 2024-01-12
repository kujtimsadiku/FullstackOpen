import { TextField } from "@mui/material";

interface Props {
  dischargeDate: string;
  criteria: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

export const HospitalForm = ({
  dischargeDate,
  criteria,
  setDischargeCriteria,
  setDischargeDate,
}: Props) => {
  return (
    <>
      <TextField
        label="Discharge Date"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      <TextField
        label="Criteria for discharge"
        fullWidth
        value={criteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
    </>
  );
};
