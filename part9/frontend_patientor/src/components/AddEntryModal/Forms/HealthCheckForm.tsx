import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { HealthCheckRating } from "../../../types";

interface Props {
  rating: HealthCheckRating;
  setRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

interface RaitingOptions {
  value: HealthCheckRating;
  label: string;
}

const raitingOptions: RaitingOptions[] = Object.values(HealthCheckRating).map(
  (r) => {
    return {
      value: r,
      label: r.toString(),
    };
  }
);

export const HealthCheckForm = ({ rating, setRating }: Props) => {
  const onHealthCheckChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const healthRating = Object.values(HealthCheckRating).find(
        (r) => r.toString() === value
      );

      console.log(healthRating);
    }
  };

  return (
    <>
      <InputLabel>Health Rating</InputLabel>
      <Select fullWidth value={""} onChange={onHealthCheckChange}>
        {raitingOptions.map((r) => (
          <MenuItem key={r.label} value={r.value}>
            {r.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
