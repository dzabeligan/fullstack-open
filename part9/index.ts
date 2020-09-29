import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi, parseArguments } from './bmi';
import { calculateExercises, parseDailyExerciseHours } from './exercise';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  try {
    const { mass: parsedWeight, height: parsedHeight } = parseArguments(['', '', String(weight), String(height)]);
    const calculatedBmi = calculateBmi(parsedWeight, parsedHeight, 'Normal(healthy weight)');
    res.json(calculatedBmi);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

app.post('/exercises', bodyParser.json(), (req, res) => {
  console.log(req.body);
  const { daily_exercises, target } = req.body;
  try {
    const parsedDailyExerciseHours = parseDailyExerciseHours(['', '', +target, ...daily_exercises]);
    res.json(calculateExercises(parsedDailyExerciseHours, +target));
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server runninng on port ${PORT}`);
});
