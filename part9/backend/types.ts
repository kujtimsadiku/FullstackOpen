export interface Diagnose {
  code: string;
  name: string;
  latin?: string; // not maybe needed to write in latin but it is optional
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

/* to return an object patient without social-security-number */
export type NonPatientSsn = Omit<Patient, "ssn">;
/* for sending an object without ID to create a new patient */
export type NewPatientEntry = Omit<Patient, "id">;
