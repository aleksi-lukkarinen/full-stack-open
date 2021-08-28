import express from "express";

import patientService from "../services/patientService";
import { toNewPatient } from "../utils";


const router = express.Router();

router.get("/", (_req, res) => {
  try {
    res.json(patientService.getPatientsNonSensitive());
  }
  catch (e) {
    let message = "An unexpected error occurred.";
    if (e instanceof Error) {
      message = e.message;
    }
    res.status(400).send(message);
  }
});

router.post("/", (req, res) => {
  try {
    const p = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(p);

    res.json(addedPatient);
  }
  catch (e) {
    let message = "An unexpected error occurred.";
    if (e instanceof Error) {
      message = e.message;
    }
    res.status(400).send(message);
  }
});

export default router;
