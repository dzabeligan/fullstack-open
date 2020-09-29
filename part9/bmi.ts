type BMI = 'Normal(healthy weight)' | 'Overweight' | 'Obese';

interface BMIValues {
  mass: number;
  height: number;
}

interface CalculatedBMI {
  weight: number;
  height: number;
  bmi: BMI;
}

export const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(+args[2]) && !isNaN(+args[3])) {
    return {
      mass: +args[2],
      height: +args[3],
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (weight: number, height: number, printText: BMI): CalculatedBMI => {
  const calculatedBmi = weight / (height / 100) ** 2;
  let bmi: BMI = printText;
  switch (calculatedBmi < 25) {
    case true:
      bmi = printText;
      break;
    case false:
      if (calculatedBmi < 30) bmi = 'Overweight';
      else bmi = 'Obese';
      break;
    default:
      break;
  }
  return { weight, height, bmi };
};

try {
  const { mass, height } = parseArguments(process.argv);
  console.log(calculateBmi(mass, height, 'Normal(healthy weight)'));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
