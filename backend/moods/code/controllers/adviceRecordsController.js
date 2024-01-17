import {
  getAllAdviceRecordsData,
  createAdviceRecordInstance
} from '../database/adviceRecordsAdapter.js';

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
 * get collection of all the advice records
 * @param {*} req request
 * @param {*} res response sent with all the advice records
 * @param {*} next next function for error handling middleware
 */
export async function getAdviceRecords(req, res, next) {
  try {
    tempResponse.data = await getAllAdviceRecordsData();
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

/**
 * create a records
 * @param {*} req request with the data for a new records
 * @param {*} res response sent with the result message
 * @param {*} next next function for error handling middleware
 */
export async function createAdviceRecord(req, res, next) {
  try {
    await createAdviceRecordInstance(req.body);
    tempResponse.data.message = 'records created successfully';
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}
