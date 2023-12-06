import { 
    createMoodsInstance,
    getAllMoodsData,
    getMoodsInstanceById,
    editMoodsInstanceById,
    deleteMoodsInstanceById
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
   * get collection of all the moods
   * @param {*} req request
   * @param {*} res response sent with all the moods
   * @param {*} next 
   */
  export async function getMoods(req, res, next) {
    try {
      tempResponse.data = await getAllMoodsData();
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * create a moods
   * @param {*} req request with the data for a new moods
   * @param {*} res response sent with the result message
   * @param {*} next 
   */
  export async function createMoods(req, res, next) {
    try {
      await createMoodsInstance(req.body);
      tempResponse.data.message = "moods created successfully";
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * get moods data by specified id
   * @param {*} req request with moods id
   * @param {*} res response sent with moods data
   * @param {*} next 
   */
  export async function getMoodsById(req, res, next) {
    try {
      tempResponse.data = await getMoodsInstanceById(req.params.id);
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  
  /**
   * edit moods data by specified id
   * @param {*} req request with moods id
   * @param {*} res response sent with a result message
   * @param {*} next 
   */
  export async function editMoodsById(req, res, next) {
    try {
      await editMoodsInstanceById(req.body, req.params.id);
      tempResponse.data.message = "moods edited successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  
  /**
   * delete moods by specified id
   * @param {*} req request with moods id
   * @param {*} res 
   * @param {*} next 
   */
  export async function deleteMoodsById(req, res, next) {
    try {
      await deleteMoodsInstanceById(req.params.id);
      tempResponse.data.message = "moods deleted successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  