import _ from "lodash";

import { readNonNegativeFloat } from "./utils";



type BmiLimitRecord = {
  lim: number|undefined,
  m: string
};

const BMI_LIMITS: BmiLimitRecord[] = [
  {lim: 18.5,       m: "Underweight"},
  {lim: 25,         m: "Normal (healthy weight)"},
  {lim: 30,         m: "Overweight"},
  {lim: undefined,  m: "Obese"}
];

export const calculateBmi =
  (heightInCm: number, weightInKg: number): string => {

  const bmi: number =
    weightInKg / Math.pow(heightInCm / 100.0, 2);

  const limitSearchResult: BmiLimitRecord | undefined =
    BMI_LIMITS.find(x => x.lim && bmi < x.lim);

  const textualClass: string =
    limitSearchResult
      ? limitSearchResult.m
      : BMI_LIMITS[BMI_LIMITS.length - 1].m;

  return textualClass;
};




const ERR_MSG_HEIGHT_ARG_MANDATORY = "Error: Giving height is mandatory.";
const ERR_MSG_WEIGHT_ARG_MANDATORY = "Error: Giving weight is mandatory.";
const ERR_MSG_HEIGHT_ARG_FORMAT =
  "Error: The height argument must be a non-negative number in centimeters.";
const ERR_MSG_WEIGHT_ARG_FORMAT =
  "Error: The weight argument must be a non-negative number in kilograms.";

export const calculateBmiCLI = (args: string[]): string => {
  if (args.length < 1) {
    throw new Error(ERR_MSG_HEIGHT_ARG_MANDATORY);
  }
  if (args.length < 2) {
    throw new Error(ERR_MSG_WEIGHT_ARG_MANDATORY);
  }

  const heightInCm: number = readNonNegativeFloat(
          args[0], ERR_MSG_HEIGHT_ARG_FORMAT);
  const weightInKg: number = readNonNegativeFloat(
          args[1], ERR_MSG_WEIGHT_ARG_FORMAT);

  const result: string = calculateBmi(heightInCm, weightInKg);

  return result;
};

const executeFromCLI = () => {
  const args: string[] = _.drop(process.argv, 1);
  try {
    const result: string = calculateBmiCLI(args);
    console.log(result);
  }
  catch (e) {
    let message = "An unknown error occurred";
    if (e instanceof Error) {
      message = e.message;
    }
    console.log(message);
  }
};

export default executeFromCLI;
