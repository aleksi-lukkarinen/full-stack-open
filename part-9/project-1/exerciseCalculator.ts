import _ from "lodash"

import {
  errorExit,
  readNonNegativeFloat
} from "./utils"


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



const calculateExercises =
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
}


const ERR_MSG_TARGET_ARG_MANDATORY: string =
  "Error: Giving the target hours is mandatory.";
const ERR_MSG_DAILY_ARGS_MANDATORY: string =
  "Error: Giving the realized daily hours is mandatory.";
const ERR_MSG_TARGET_ARG_FORMAT: string =
  "Error: The target hours argument must be a non-negative number.";
const ERR_MSG_DAILY_ARGS_FORMAT: string =
  "Error: Daily hour arguments must be non-negative numbers.";

const processCommandline = (): ExerciseAssessment => {
  const args: string[] = _.drop(process.argv, 2);

  if (args.length < 1) { errorExit(ERR_MSG_TARGET_ARG_MANDATORY); }
  if (args.length < 2) { errorExit(ERR_MSG_DAILY_ARGS_MANDATORY); }

  let target: number = Number.NaN
  const dailyHours: number[] = [];
  try {
    target = readNonNegativeFloat(
                args[0], ERR_MSG_TARGET_ARG_FORMAT);

    for (let i:number=1; i<args.length; i++) {
      const h: number = readNonNegativeFloat(
                  args[i], ERR_MSG_DAILY_ARGS_FORMAT);

      dailyHours.push(h);
    }
  }
  catch (e) {
    errorExit(e.message)
  }

  return calculateExercises(dailyHours, target);
}


console.log(processCommandline());
