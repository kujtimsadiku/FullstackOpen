import { Button, Container, Typography } from "@mui/material";
import { Diagnosis, EntryWithoutID, Patient } from "../../types";
import { useMatch } from "react-router-dom";
import { ShowEntries, ShowGender } from "./utilComponent";
import { useState } from "react";
import AddEntryModal from "../AddEntryModal/index";
import entriesService from "../../services/entry";
import axios from "axios";

interface Props {
  patients: Patient[];
  diagnosis: Diagnosis[];
}

const isString = (params: unknown): params is string => {
  return typeof params === "string";
};

const parseID = (id: unknown): string => {
  if (!isString(id)) return ""; // no need to throw error since im checking if (patient)

  return id;
};

const PatientInfo = ({ patients, diagnosis }: Props) => {
  const match = useMatch("/patients/:id");
  const [error, setError] = useState<string>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const patientByID = (id: string): Patient | undefined => {
    const patient = patients.find((p) => p.id === id);

    return patient;
  };

  const patient = match ? patientByID(parseID(match.params.id)) : null;

  const handleEntrySubmit = async (values: EntryWithoutID) => {
    try {
      const entry = await entriesService.create(values);

      patient?.entries.push(entry);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data &&
          typeof error?.response?.data === "string"
        ) {
          const message = error.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", error);
        setError("Unknown error");
      }
    }
  };

  if (patient) {
    return (
      <Container style={{ paddingLeft: "0" }}>
        <Typography variant="h4" marginTop={"0.5em"}>
          {patient.name}
          <ShowGender gender={patient.gender} />
        </Typography>
        <Typography>ssh: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        <Typography variant="h4" marginTop={"1em"}>
          entries
        </Typography>
        <ShowEntries diagnosis={diagnosis} patient={patient} />
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={handleEntrySubmit}
          onClose={closeModal}
          error={error}
        />
        <Button variant="contained" color="primary" onClick={() => openModal()}>
          create new
        </Button>
      </Container>
    );
  }

  return (
    <Typography variant="h4" style={{ fontWeight: "bold", marginTop: "0.5em" }}>
      No info found
    </Typography>
  );
};

export default PatientInfo;
