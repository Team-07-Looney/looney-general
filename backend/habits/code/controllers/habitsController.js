import data from './habits.json' assert { type: 'json' };
import { getAllHabitsData } from '../database/adapter.js';

function getToDay() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate);
  return currentDate;
}

const tempResponse = {
  meta: {
    date: getToDay(),
  },
  data: {
    message: 'this route is not implemented yet',
  },
};

export async function getHabits(req, res) {
  try {
    tempResponse.data = await getAllHabitsData();
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}