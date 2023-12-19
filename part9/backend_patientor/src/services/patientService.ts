import {
  Patient,
  NewPatientEntry,
  NonSensitivePatient,
  Entry,
  EntryWithoutID,
} from "../../types";
import dataPatients from "../data/patientsData";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return dataPatients;
};

const getNonPatientSnn = (): NonSensitivePatient[] => {
  return dataPatients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const findById = (id: string): Patient | undefined => {
  const patientById = dataPatients.find((patient) => patient.id === id);

  return patientById;
};

const addPatients = (patient: NewPatientEntry): Patient => {
  const id = uuid();

  const newPatient: Patient = { id: id, ...patient };
  dataPatients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: EntryWithoutID): Entry => {
  const id = uuid();

  const new_entry = {
    id,
    ...entry,
  };

  patient.entries.push(new_entry);

  return new_entry;
};

export default {
  getPatients,
  addPatients,
  getNonPatientSnn,
  findById,
  addEntry,
};
