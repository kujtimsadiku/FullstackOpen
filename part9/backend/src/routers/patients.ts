import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.GetPatients()).status(200);
});

router.post("/", (_req, res) => {
  res.send("Saving patient").status(200);
});

export default router;
