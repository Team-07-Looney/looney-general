import { 
  createRecordInstance,
  getAllRecordsData,
  getRecordInstanceById,
} from '../database/recordsAdapter.js';
  
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
 * get collection of all the records
 * @param {*} req request
 * @param {*} res response sent with all the records
 * @param {*} next 
 */
export async function getRecords(req, res, next) {
  try {
    tempResponse.data = await getAllRecordsData();
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}
  
/**
   * create a record
   * @param {*} req request with the data for a new record
   * @param {*} res response sent with the result message
   * @param {*} next 
   */
export async function createRecord(req, res, next) {
  try {
    const message = await createRecordInstance(req.body, tempResponse.meta.date);
    tempResponse.data.message = message?message:'Record created successfully';
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}
  
/**
   * get record data by specified id
   * @param {*} req request with record id
   * @param {*} res response sent with record data
   * @param {*} next 
   */
export async function getRecordById(req, res, next) {
  try {
    tempResponse.data = await getRecordInstanceById(req.params.id);
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}