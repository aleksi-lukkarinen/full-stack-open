import _ from "lodash";

import {
  errorExit,
  readNonNegativeFloat
} from "./utils";


const ratingDescriptions = [
  "Please try to improve your exercise routine.",
  "Not too bad, but could be better.",
  "Well done! You have met your goal!"
];

interface ExerciseAssessment {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}



export const calculateExercises =
  (dailyHoursOfPeriod: number[],
    targetHours: number): ExerciseAssessment => {

  const periodLength: number = dailyHoursOfPeriod.length;
  const trainingDays: number =
    _.filter(dailyHoursOfPeriod, v => v > 0).length;

  const trainingHours: number = _.sum(dailyHoursOfPeriod);

  const average: number = trainingHours / periodLength;

  const rating: number =
      average < 0.6 * targetHours ? 1
    : average <       targetHours ? 2
    : 3;

  const success: boolean = rating == 3;

  const ratingDescription: string =
    ratingDescriptions[rating - 1];

  const assessment: ExerciseAssessment = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average
  };

  return assessment;
};


const ERR_MSG_TARGET_ARG_MANDATORY =
  "Error: Giving the target hours is mandatory.";
const ERR_MSG_DAILY_ARGS_MANDATORY =
  "Error: Giving the realized daily hours is mandatory.";
const ERR_MSG_TARGET_ARG_FORMAT =
  "Error: The target hours argument must be a non-negative number.";
const ERR_MSG_DAILY_ARGS_FORMAT =
  "Error: Daily hour arguments must be non-negative numbers.";

const calculateExercisesCLI = (args: string[]): ExerciseAssessment => {
  if (args.length < 1) { errorExit(ERR_MSG_TARGET_ARG_MANDATORY); }
  if (args.length < 2) { errorExit(ERR_MSG_DAILY_ARGS_MANDATORY); }

  const target: number = readNonNegativeFloat(
            args[0], ERR_MSG_TARGET_ARG_FORMAT);

  const dailyHours: number[] = [];
  for (let i=1; i<args.length; i++) {
    const h: number = readNonNegativeFloat(
                args[i], ERR_MSG_DAILY_ARGS_FORMAT);

    dailyHours.push(h);
  }

  const result: ExerciseAssessment =
      calculateExercises(dailyHours, target);

  return result;
};



const executeFromCLI = () => {
  const args: string[] = _.drop(process.argv, 1);
  try {
    const result: ExerciseAssessment =
            calculateExercisesCLI(args);
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
