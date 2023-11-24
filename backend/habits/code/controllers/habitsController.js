import { 
  createHabitInstance,
  getAllHabitsData,
  getHabitInstanceById,
  editHabitInstanceById,
  deleteHabitInstanceById
} from '../database/adapter.js';

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

export async function getHabits(req, res, next) {
  try {
    tempResponse.data = await getAllHabitsData();
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

export async function createHabit(req, res, next) {
  try {
    await createHabitInstance(req);
    tempResponse.data.message = "habit created successfully";
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

export async function getHabitById(req, res, next) {
  try {
    const url_parts = req.url.replace(/\/\s*$/, '').split('/');
    tempResponse.data = await getHabitInstanceById(url_parts[2]);
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}

export async function editHabitById(req, res, next) {
  try {
    const url_parts = req.url.replace(/\/\s*$/, '').split('/');
    await editHabitInstanceById(req.body, url_parts[2]);
    tempResponse.data.message = "habit edited successfully";
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}

export async function deleteHabitById(req, res, next) {
  try {
    await deleteHabitInstanceById(req.body.id);
    tempResponse.data.message = "habit deleted successfully";
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}
