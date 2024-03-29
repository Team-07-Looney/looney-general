import {
  createReasonInstance,
  getAllReasonData,
  getReasonInstanceById,
  editReasonInstanceById,
  deleteReasonInstanceById
} from '../database/reasonsAdapter.js';
  
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
 * get collection of all the reasons
 * @param {*} req request
 * @param {*} res response sent with all the reasons
 * @param {*} next next function for error handling middleware
 */
export async function getReason(req, res, next) {
  try {
    tempResponse.data = await getAllReasonData();
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}
  
/**
 * create a reasons
 * @param {*} req request with the data for a new reasons
 * @param {*} res response sent with the result message
 * @param {*} next next function for error handling middleware
 */
export async function createReason(req, res, next) {
  try {
    await createReasonInstance(req.body);
    tempResponse.data.message = 'reasons created successfully';
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}
  
/**
 * get reasons data by specified id
 * @param {*} req request with reasons id
 * @param {*} res response sent with reasons data
 * @param {*} next next function for error handling middleware
 */
export async function getReasonById(req, res, next) {
  try {
    tempResponse.data = await getReasonInstanceById(req.params.id);
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}
  
/**
 * edit reasons data by specified id
 * @param {*} req request with reasons id
 * @param {*} res response sent with a result message
 * @param {*} next next function for error handling middleware
 */
export async function editReasonById(req, res, next) {
  try {
    await editReasonInstanceById(req.body, req.params.id);
    tempResponse.data.message = 'reasons edited successfully';
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}
  
/**
 * delete reasons by specified id
 * @param {*} req request with reasons id
 * @param {*} res response sent with a result message
 * @param {*} next next function for error handling middleware
 */
export async function deleteReasonById(req, res, next) {
  try {
    await deleteReasonInstanceById(req.params.id);
    tempResponse.data.message = 'reasons deleted successfully';
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}
  
