import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfo";
import diagnosisService from "./services/diagnosis";
import DiagnosisContext from "./contexts/diagnosisContext";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnosis_list = await diagnosisService.getAll();

      setDiagnosis(diagnosis_list);
    };

    void fetchDiagnosisList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <DiagnosisContext.Provider value={diagnosis}>
            <Routes>
              <Route
                path="/"
                element={
                  <PatientListPage
                    patients={patients}
                    setPatients={setPatients}
                  />
                }
              />
              <Route
                path="/patients/:id"
                element={<PatientInfo patients={patients} />}
              />
            </Routes>
          </DiagnosisContext.Provider>
        </Container>
      </Router>
    </div>
  );
};

export default App;
