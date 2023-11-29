import express from "express";
import patientsRouter from "./src/routers/patients";
import diagnoseRouter from "./src/routers/diagnoses";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("Server is up").status(200);
});

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnoseRouter);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running up on port ${PORT}`);
});
