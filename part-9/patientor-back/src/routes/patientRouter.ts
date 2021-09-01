import express from "express";

import patientService from "../services/patientService";
import { toId, toNewEntry, toNewPatient } from "../utils";


const router = express.Router();


router.get("/", (_req, res) => {
  try {
    const patientsSensitive =
      patientService.getPatientsNonSensitive();

    res.json(patientsSensitive);
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


router.get("/:id", (req, res) => {
  try {
    const patientId: string = toId(req.params.id);
    const patientSensitive =
      patientService.getPatientSensitive(patientId);

    res.json(patientSensitive);
  }
  catch (e) {
    let message = "An unexpected error occurred.";
    if (e instanceof Error) {
      message = e.message;
    }
    res.status(400).send(message);
  }
});


router.post("/:id/entries", (req, res) => {
  try {
    const patientId: string = toId(req.params.id);
    const e = toNewEntry(req.body);
    const addedEntry =
        patientService.addEntryForPatient(patientId, e);

    res.json(addedEntry);
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
