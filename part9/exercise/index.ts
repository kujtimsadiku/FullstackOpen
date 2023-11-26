import * as express from "express";
import { CalculateResult } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (
    isNaN(Number(target)) ||
    (daily_exercises as number[]).some(
      (value: number) => typeof value !== "number"
    )
  ) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const exercise = CalculateResult(
    daily_exercises as number[],
    target as number
  );

  res.status(200).send(exercise);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
