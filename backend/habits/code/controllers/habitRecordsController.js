import { 
    createHabitRecordInstance,
    getAllHabitRecordsData,
    getHabitRecordInstanceById,
} from '../database/habitRecordsAdapter.js';
  
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
   * get collection of all the records
   * @param {*} req request
   * @param {*} res response sent with all the records
   * @param {*} next 
   */
  export async function getHabitRecords(req, res, next) {
    try {
      tempResponse.data = await getAllHabitRecordsData();
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
  export async function createHabitRecord(req, res, next) {
    try {
      const message = await createHabitRecordInstance(req.body, tempResponse.meta.date);
      tempResponse.data.message = message?message:"Record created successfully";
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
  export async function getHabitRecordById(req, res, next) {
    try {
      tempResponse.data = await getHabitRecordInstanceById(req.params.id);
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }