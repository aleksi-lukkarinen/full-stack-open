/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from "express";

import patientService from "../services/patientService";


const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getPatientsNonSensitive());
});

router.post("/", (req, res) => {
  const { ssn, name, dateOfBirth, gender, occupation } = req.body;
  const p = {ssn, name, dateOfBirth, gender, occupation};
  const addedPatient = patientService.addPatient(p);

  res.json(addedPatient);
});

export default router;
