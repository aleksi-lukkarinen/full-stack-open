import express from "express";

import diagnoseService from "../services/diagnoseService";


const router = express.Router();

router.get("/", (_req, res) => {
  try {
    res.json(diagnoseService.getDiagnoses());
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
