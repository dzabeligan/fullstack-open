type Rating = 1 | 2 | 3;
type RatingDescription = 'bad' | 'okay' | 'perfect';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseDailyExerciseHours = (args: Array<any>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');

  return args.slice(3).map((arg) => {
    if (!isNaN(+arg)) return +arg;
    else throw new Error('All provided values were not numbers!');
  });
};

export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
  const periodLength = dailyExerciseHours.length;

  const trainingDays: number = dailyExerciseHours.reduce(
    (count, currentValue) => (currentValue > 0 ? count + 1 : count),
    0,
  );

  const average: number =
    dailyExerciseHours.reduce((accumulator, currentValue) => accumulator + currentValue) / periodLength;

  const success = average >= target;

  let rating: Rating = 1;
  let ratingDescription: RatingDescription = 'bad';

  switch (success) {
    case false:
      rating = 1;
      ratingDescription = 'bad';
      break;
    case true:
      if (average === target) {
        rating = 2;
        ratingDescription = 'okay';
      } else {
        rating = 3;
        ratingDescription = 'perfect';
      }
    default:
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const parsedDailyExerciseHours = parseDailyExerciseHours(process.argv);
  console.log(calculateExercises(parsedDailyExerciseHours, +process.argv[2]));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
