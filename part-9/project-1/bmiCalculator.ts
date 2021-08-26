import {
  CLI_ARGS,
  NUM_CLI_ARGS,
  errorExit,
  readNonNegativeFloat
} from "./utils";



const calculateBmi =
  (heightInCm: number, weightInKg: number): string => {

  const bmi = weightInKg / Math.pow(heightInCm / 100.0, 2);

  const textualClass =
      bmi < 18.5 ? "Underweight"
    : bmi < 25   ? "Normal (healthy weight)"
    : bmi < 30   ? "Overweight"
    : "Obese";

  return textualClass;
}




const ERR_MSG_HEIGHT_ARG_MANDATORY: string =
  "Error: Giving height is mandatory.";
const ERR_MSG_WEIGHT_ARG_MANDATORY: string =
  "Error: Giving weight is mandatory.";
const ERR_MSG_HEIGHT_ARG_FORMAT: string =
  "Error: The height argument must be a non-negative number in centimeters.";
const ERR_MSG_WEIGHT_ARG_FORMAT: string =
  "Error: The weight argument must be a non-negative number in kilograms.";

const processCommandline = (): string => {
  if (NUM_CLI_ARGS < 1) { errorExit(ERR_MSG_HEIGHT_ARG_MANDATORY); }
  if (NUM_CLI_ARGS < 2) { errorExit(ERR_MSG_WEIGHT_ARG_MANDATORY); }

  const heightCm: number =
    readNonNegativeFloat(CLI_ARGS[0], ERR_MSG_HEIGHT_ARG_FORMAT);

  const weightKg: number =
    readNonNegativeFloat(CLI_ARGS[1], ERR_MSG_WEIGHT_ARG_FORMAT);

  return calculateBmi(heightCm, weightKg);
}


console.log(processCommandline());
