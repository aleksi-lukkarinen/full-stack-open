import diagnoseData from "../../data/diagnoses.json";
import { Diagnosis } from "../types";


const diagnoses: Diagnosis[] = diagnoseData;


const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};


export default {
  getDiagnoses
};
