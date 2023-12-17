import { 
  createHabitInstance,
  getAllHabitsData,
  getHabitInstanceById,
  editHabitInstanceById,
  deleteHabitInstanceById
} from '../database/habitsAdapter.js';

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

/**
 * get collection of all the habits
 * @param {*} req request
 * @param {*} res response sent with all the habits
 * @param {*} next 
 */
export async function getHabits(req, res, next) {
  try {
    tempResponse.data = await getAllHabitsData();
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

/**
 * create a habit
 * @param {*} req request with the data for a new habit
 * @param {*} res response sent with the result message
 * @param {*} next 
 */
export async function createHabit(req, res, next) {
  try {
    await createHabitInstance(req.body);
    tempResponse.data.message = "habit created successfully";
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

/**
 * get habit data by specified id
 * @param {*} req request with habit id
 * @param {*} res response sent with habit data
 * @param {*} next 
 */
export async function getHabitById(req, res, next) {
  try {
    tempResponse.data = await getHabitInstanceById(req.params.habitId);
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}

/**
 * edit habit data by specified id
 * @param {*} req request with habit id
 * @param {*} res response sent with a result message
 * @param {*} next 
 */
export async function editHabitById(req, res, next) {
  try {
    await editHabitInstanceById(req.body, req.params.habitId);
    tempResponse.data.message = "habit edited successfully";
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}

/**
 * delete habit by specified id
 * @param {*} req request with habit id
 * @param {*} res 
 * @param {*} next 
 */
export async function deleteHabitById(req, res, next) {
  try {
    await deleteHabitInstanceById(req.params.habitId);
    tempResponse.data.message = "habit deleted successfully";
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}
