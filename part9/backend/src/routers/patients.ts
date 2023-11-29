import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/toNewPatientEntry";

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
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatients(newPatientEntry);

    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error;
    }
    res.status(400).send(errorMessage);
  }

  res.send("Saving patient").status(200);
});

export default router;
