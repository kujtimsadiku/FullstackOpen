import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { HealthCheckRating } from "../../../types";

interface Props {
  rating: HealthCheckRating;
  setRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

interface RatingOptions {
  value: number;
  label: string;
}

const ratingOptions: RatingOptions[] = Object.values(HealthCheckRating)
  .filter((r) => typeof r === "number")
  .map((v) => ({
    value: v as number,
    label: v.toString(),
  }));

export const HealthCheckForm = ({ rating, setRating }: Props) => {
  const onHealthCheckChange = (event: SelectChangeEvent<HealthCheckRating>) => {
    event.preventDefault();

    if (typeof event.target.value === "number") {
      const value = Number(event.target.value);
      const healthRating = Object.values(HealthCheckRating);

      if (healthRating && healthRating.includes(value)) {
        setRating(value);
        console.log(rating);
      }
    }
  };

  return (
    <>
      <InputLabel>Health Rating</InputLabel>
      <Select fullWidth value={rating} onChange={onHealthCheckChange}>
        {ratingOptions.map((r) => (
          <MenuItem key={r.label} value={r.value}>
            {r.value}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
