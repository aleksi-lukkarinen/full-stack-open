import express from "express";
import { calculateBmiCLI } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";


const app = express();
app.use(express.json());


app.post("/exercises", (req, res) => {
  /* eslint-disable
      @typescript-eslint/no-explicit-any,
      @typescript-eslint/no-unsafe-assignment,
      @typescript-eslint/no-unsafe-member-access */
  const target: any =
      req.body ? req.body.target : undefined;
  const dailyHours: any =
      req.body ? req.body.daily_exercises : undefined;
  /* eslint-enable
      @typescript-eslint/no-explicit-any,
      @typescript-eslint/no-unsafe-assignment,
      @typescript-eslint/no-unsafe-member-access */

  if (!dailyHours || !target) {
    res.json({ error: "parameters missing" });
    return;
  }

  if (typeof(target) !== "number"
    || Number.isNaN(target)
    || target < 0
    || !Array.isArray(dailyHours)
    || !dailyHours.every(x =>
          typeof(x) === "number"
          && !Number.isNaN(x)
          && x >= 0)) {

    res.json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateExercises(dailyHours, target);
  res.json(result);
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

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
