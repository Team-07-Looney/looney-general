import {
  createMoodTypeInstance,
  getAllMoodTypeData,
  getMoodTypeInstanceById,
  editMoodTypeInstanceById,
  deleteMoodTypeInstanceById
} from '../database/moodTypesAdapter.js';
  
/**
 * function that calculates today's date
 * @returns today's date
 */
function getToDay() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  const currentDate = `${day}-${month}-${year}`;
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
 * get collection of all the moodtypes
 * @param {*} req request
 * @param {*} res response sent with all the moodtypes
 * @param {*} next next function for error handling middleware
 */
export async function getMoodType(req, res, next) {
  try {
    tempResponse.data = await getAllMoodTypeData();
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}
  
/**
 * create a moodtypes
 * @param {*} req request with the data for a new moodtypes
 * @param {*} res response sent with the result message
 * @param {*} next next function for error handling middleware
 */
export async function createMoodType(req, res, next) {
  try {
    await createMoodTypeInstance(req.body);
    tempResponse.data.message = 'moodtypes created successfully';
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}
  
/**
 * get moodtypes data by specified id
 * @param {*} req request with moodtypes id
 * @param {*} res response sent with moodtypes data
 * @param {*} next next function for error handling middleware
 */
export async function getMoodTypeById(req, res, next) {
  try {
    tempResponse.data = await getMoodTypeInstanceById(req.params.id);
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}
  
/**
 * edit moodtypes data by specified id
 * @param {*} req request with moodtypes id
 * @param {*} res response sent with a result message
 * @param {*} next next function for error handling middleware
 */
export async function editMoodTypeById(req, res, next) {
  try {
    await editMoodTypeInstanceById(req.body, req.params.id);
    tempResponse.data.message = 'moodtypes edited successfully';
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}
  
/**
 * delete moodtypes by specified id
 * @param {*} req request with moodtypes id
 * @param {*} res response sent with a result message
 * @param {*} next next function for error handling middleware
 */
export async function deleteMoodTypeById(req, res, next) {
  try {
    await deleteMoodTypeInstanceById(req.params.id);
    tempResponse.data.message = 'moodtypes deleted successfully';
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}
  
