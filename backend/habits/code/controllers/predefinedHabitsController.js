import { getAllPredefinedHabitsData } from '../database/predefinedHabitsAdapter.js';

/**
 * function that calculates today's date
 * @returns today's date
 */
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

export async function getPredefinedHabits(req, res, next) {
    try {
      tempResponse.data = await getAllPredefinedHabitsData();
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }

  }
