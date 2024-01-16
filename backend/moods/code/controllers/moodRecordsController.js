import { 
    createRecordInstance,
    getAllRecordData,
    getRecordInstanceById,
    editRecordInstanceById,
    deleteRecordInstanceById
  } from '../database/moodRecordsAdapter.js';
  
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
  export async function getRecord(req, res, next) {
    try {
      const records = await getAllRecordData();
      const recordAPIresponse = records.map(record => ({
        ...record,
        reason_id: `/reasons/${record.reason_id}`,
        mood_id: `/moods/${record.mood_id}`
      }))
      tempResponse.data = recordAPIresponse;
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * create a records
   * @param {*} req request with the data for a new records
   * @param {*} res response sent with the result message
   * @param {*} next 
   */
  export async function createRecord(req, res, next) {
    try {
      console.log(req.body);
      await createRecordInstance(req.body);
      tempResponse.data.message = "records created successfully";
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * get records data by specified id
   * @param {*} req request with records id
   * @param {*} res response sent with records data
   * @param {*} next 
   */
  export async function getRecordById(req, res, next) {
    try {
      const recordsById = await getRecordInstanceById(req.params.id);
      const recordsByIdAPIresponse = recordsById.map(recordById => ({
        ...recordById,
        reason_id: `/reasons/${recordById.reason_id}`,
        mood_id: `/moods/${recordById.mood_id}`
      }))
      tempResponse.data = recordsByIdAPIresponse;
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  
  /**
   * edit records data by specified id
   * @param {*} req request with records id
   * @param {*} res response sent with a result message
   * @param {*} next 
   */
  export async function editRecordById(req, res, next) {
    try {
      await editRecordInstanceById(req.body, req.params.id);
      tempResponse.data.message = "records edited successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  
  /**
   * delete records by specified id
   * @param {*} req request with records id
   * @param {*} res 
   * @param {*} next 
   */
  export async function deleteRecordById(req, res, next) {
    try {
      await deleteRecordInstanceById(req.params.id);
      tempResponse.data.message = "records deleted successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  