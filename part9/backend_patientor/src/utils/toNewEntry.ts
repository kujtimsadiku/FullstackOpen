import {
  Diagnose,
  Discharge,
  EntryWithoutID,
  HealthCheckRating,
  NewBaseEntry,
  SickLeave,
} from "../../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date" + date);
  }
  return date;
};

const isHealthCheckRating = (num: number): num is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(num);
};

const parseHealthCheck = (object: unknown): HealthCheckRating => {
  if (!isNumber(object) || !isHealthCheckRating(object)) {
    throw new Error("Incorrect or missing health check rating: " + object);
  }

  return object;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description " + description);
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist " + specialist);
  }

  return specialist;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing criteria " + criteria);
  }

  return criteria;
};

const parseEmployerName = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error("Incorrect or missing employer name" + employer);
  }

  return employer;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  console.log(object);
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    console.log(false);
    return [] as Array<Diagnose["code"]>;
  }
  console.log(true);
  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect format on discharge: " + discharge);
  }

  if ("date" in discharge && "criteria" in discharge) {
    const parsed_discharge: Discharge = {
      date: parseDate(discharge.date),
      criteria: parseCriteria(discharge.criteria),
    };
    return parsed_discharge;
  }

  throw new Error("Incorrect data: some fields are missing in discharge");
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect format on discharge: " + object);
  }

  if ("startDate" in object && "endDate" in object) {
    const new_sick_leave: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
    return new_sick_leave;
  }

  throw new Error("Incorrect data: some fields are missing in sick leave");
};

const toNewEntry = (object: unknown): EntryWithoutID => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("description" in object && "date" in object && "specialist" in object) {
    const parsedEntry =
      "diagnosisCodes" in object
        ? ({
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
          } as NewBaseEntry)
        : ({
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
          } as NewBaseEntry);

    if ("type" in object) {
      switch (object.type) {
        case "Hospital":
          if ("discharge" in object) {
            const hospitalEntry: EntryWithoutID = {
              ...parsedEntry,
              type: "Hospital",
              discharge: parseDischarge(object.discharge),
            };

            return hospitalEntry;
          }
          throw new Error("Incorrect data: discharge missing");
        case "OccupationalHealthcare":
          if ("employerName" in object) {
            let occupationalHealthcareEntry: EntryWithoutID;

            if ("sickLeave" in object) {
              occupationalHealthcareEntry = {
                ...parsedEntry,
                type: "OccupationalHealthcare",
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave),
              };
            } else {
              occupationalHealthcareEntry = {
                ...parsedEntry,
                type: "OccupationalHealthcare",
                employerName: parseEmployerName(object.employerName),
              };
            }

            return occupationalHealthcareEntry;
          }
          throw new Error("Incorrect data: employer name missing");
        case "HealthCheck":
          if ("healthCheckRating" in object) {
            const healthCheckEntry: EntryWithoutID = {
              ...parsedEntry,
              type: "HealthCheck",
              healthCheckRating: parseHealthCheck(object.healthCheckRating),
            };

            return healthCheckEntry;
          }
      }
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewEntry;
