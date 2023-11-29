import { Patient, NonPatientSsn, NewPatientEntry } from "../../types";
import dataPatients from "../data/patientsData";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return dataPatients;
};

const getNonPatientSnn = (): NonPatientSsn[] => {
  return dataPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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

export default {
  getPatients,
  addPatients,
  getNonPatientSnn,
  findById,
};
