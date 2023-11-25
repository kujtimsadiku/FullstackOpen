import express from "express";
import { calculateBmi } from "./bmiCalculator";
import qs from "qs";

const app = express();

app.use(express.json());

app.get("/bmi", (req, res) => {
  const { height, weight } = qs.parse(req.url.split("?")[1]);

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.send({ error: "malformatted parameters" }).status(400);
  }

  const bmi = {
    height: height,
    weight: weight,
    bmi: calculateBmi(Number(height), Number(weight)),
  };
  res.status(200).send(bmi);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
