import { 
    createReasonsInstance,
    getAllReasonsData,
    getReasonsInstanceById,
    editReasonsInstanceById,
    deleteReasonsInstanceById
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
   * get collection of all the reasons
   * @param {*} req request
   * @param {*} res response sent with all the reasons
   * @param {*} next 
   */
  export async function getReasons(req, res, next) {
    try {
      tempResponse.data = await getAllReasonsData();
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * create a reasons
   * @param {*} req request with the data for a new reasons
   * @param {*} res response sent with the result message
   * @param {*} next 
   */
  export async function createReasons(req, res, next) {
    try {
      await createReasonsInstance(req.body);
      tempResponse.data.message = "reasons created successfully";
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * get reasons data by specified id
   * @param {*} req request with reasons id
   * @param {*} res response sent with reasons data
   * @param {*} next 
   */
  export async function getReasonsById(req, res, next) {
    try {
      tempResponse.data = await getReasonsInstanceById(req.params.id);
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  
  /**
   * edit reasons data by specified id
   * @param {*} req request with reasons id
   * @param {*} res response sent with a result message
   * @param {*} next 
   */
  export async function editReasonsById(req, res, next) {
    try {
      await editReasonsInstanceById(req.body, req.params.id);
      tempResponse.data.message = "reasons edited successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  
  /**
   * delete reasons by specified id
   * @param {*} req request with reasons id
   * @param {*} res 
   * @param {*} next 
   */
  export async function deleteReasonsById(req, res, next) {
    try {
      await deleteReasonsInstanceById(req.params.id);
      tempResponse.data.message = "reasons deleted successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  