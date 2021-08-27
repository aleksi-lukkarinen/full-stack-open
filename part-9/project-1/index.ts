import express from "express";
import { calculateBmiCLI } from "./bmiCalculator";


const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const heightInCm = req.query.height ? String(req.query.height) : "";
  const weightInKg = req.query.weight ? String(req.query.weight) : "";

  let result = "";
  try {
    result = calculateBmiCLI([heightInCm, weightInKg]);
  }
  catch (e) {
    if (e instanceof Error) {
      result = e.message;
    }
    else {
      result = "An unknown error occurred";
    }
  }

  res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
