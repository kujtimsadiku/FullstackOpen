import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils/toNewPatient";
import toNewEntry from "../utils/toNewEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetching all the patients");

  res.send(patientService.getPatients()).status(200);
});

router.get("/:id", (req, res) => {
  const paramsID = patientService.findById(req.params.id);

  if (paramsID) {
    res.send(paramsID).status(200);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatients(newPatient);

    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);

    if (patient === undefined) {
      res.status(404).send(`patient not found`);
      return;
    }

    const newEntry = toNewEntry(req.body);
    const ret = patientService.addEntry(patient, newEntry);
    res.json(ret).status(201);
  } catch (error) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
