import { Diagnose } from "../../types";
import dataDiagnose from "../data/diagnosesData";

const GetDiagnoses = (): Diagnose[] => {
  return dataDiagnose;
};

const AddDiagnoses = () => {
  return null;
};

export default {
  GetDiagnoses,
  AddDiagnoses,
};
