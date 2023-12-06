import { 
    createMoodTypesInstance,
    getAllMoodTypesData,
    getMoodTypesInstanceById,
    editMoodTypesInstanceById,
    deleteMoodTypesInstanceById
  } from '../database/adapter.js';
  
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
   * get collection of all the moodtypes
   * @param {*} req request
   * @param {*} res response sent with all the moodtypes
   * @param {*} next 
   */
  export async function getMoodTypes(req, res, next) {
    try {
      tempResponse.data = await getAllMoodTypesData();
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * create a moodtypes
   * @param {*} req request with the data for a new moodtypes
   * @param {*} res response sent with the result message
   * @param {*} next 
   */
  export async function createMoodTypes(req, res, next) {
    try {
      await createMoodTypesInstance(req.body);
      tempResponse.data.message = "moodtypes created successfully";
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * get moodtypes data by specified id
   * @param {*} req request with moodtypes id
   * @param {*} res response sent with moodtypes data
   * @param {*} next 
   */
  export async function getMoodTypesById(req, res, next) {
    try {
      tempResponse.data = await getMoodTypesInstanceById(req.params.id);
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  
  /**
   * edit moodtypes data by specified id
   * @param {*} req request with moodtypes id
   * @param {*} res response sent with a result message
   * @param {*} next 
   */
  export async function editMoodTypesById(req, res, next) {
    try {
      await editMoodTypesInstanceById(req.body, req.params.id);
      tempResponse.data.message = "moodtypes edited successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  
  /**
   * delete moodtypes by specified id
   * @param {*} req request with moodtypes id
   * @param {*} res 
   * @param {*} next 
   */
  export async function deleteMoodTypesById(req, res, next) {
    try {
      await deleteMoodTypesInstanceById(req.params.id);
      tempResponse.data.message = "moodtypes deleted successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  