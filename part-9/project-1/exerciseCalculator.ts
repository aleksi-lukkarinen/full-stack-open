const ratingDescriptions = [
  "Please try to improve your exercise routine.",
  "Not too bad, but could be better.",
  "Well done! You have met your goal!"
]

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

  const periodLength = dailyHoursOfPeriod.length;
  const trainingDays =
    dailyHoursOfPeriod.filter(v => v > 0).length;

  const trainingHours =
    dailyHoursOfPeriod.reduce((a, b) => a + b, 0);

  const average = trainingHours / periodLength;

  const rating =
      average < 0.6 * targetHours ? 1
    : average <       targetHours ? 2
    : 3;

  const success = rating == 3;

  const ratingDescription =
    ratingDescriptions[rating - 1];

  const assessment = {
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


console.log(calculateExercises([3, 0, 0, 0, 0, 3, 1], 2));
