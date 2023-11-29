import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetching all the patients");

  res.send(patientService.getNonPatientSnn()).status(200);
});

router.get("/:id", (req, res) => {
  const paramsID = patientService.findById(req.params.id);

  if (paramsID) {
    res.send(paramsID).status(200);
  } else {
    res.sendStatus(400);
  }
});

router.post("/", (_req, res) => {
  res.send("Saving patient").status(200);
});

export default router;
