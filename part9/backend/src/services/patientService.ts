import { Patient, NonPatientSsn } from "../../types";
import dataPatients from "../data/patientsData";

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

const addPatients = () => {
  return null;
};

export default {
  getPatients,
  addPatients,
  getNonPatientSnn,
  findById,
};
