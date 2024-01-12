import { TextField } from "@mui/material";

interface Props {
  rating: string;
  setRating: React.Dispatch<React.SetStateAction<string>>;
}

export const HealthCheckForm = ({ rating, setRating }: Props) => {
  return (
    <>
      <TextField
        label="Healthcheck Rating"
        fullWidth
        value={rating}
        onChange={({ target }) => setRating(target.value)}
      />
    </>
  );
};
