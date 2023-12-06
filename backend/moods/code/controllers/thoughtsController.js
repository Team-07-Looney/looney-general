import { 
    createThoughtsInstance,
    getAllThoughtsData,
    getThoughtsInstanceById,
    editThoughtsInstanceById,
    deleteThoughtsInstanceById
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
   * get collection of all the thoughts
   * @param {*} req request
   * @param {*} res response sent with all the thoughts
   * @param {*} next 
   */
  export async function getThoughts(req, res, next) {
    try {
      tempResponse.data = await getAllThoughtsData();
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * create a thoughts
   * @param {*} req request with the data for a new thoughts
   * @param {*} res response sent with the result message
   * @param {*} next 
   */
  export async function createThoughts(req, res, next) {
    try {
      await createThoughtsInstance(req.body);
      tempResponse.data.message = "thoughts created successfully";
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * get thoughts data by specified id
   * @param {*} req request with thoughts id
   * @param {*} res response sent with thoughts data
   * @param {*} next 
   */
  export async function getThoughtsById(req, res, next) {
    try {
      tempResponse.data = await getThoughtsInstanceById(req.params.id);
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  
  /**
   * edit thoughts data by specified id
   * @param {*} req request with thoughts id
   * @param {*} res response sent with a result message
   * @param {*} next 
   */
  export async function editThoughtsById(req, res, next) {
    try {
      await editThoughtsInstanceById(req.body, req.params.id);
      tempResponse.data.message = "thoughts edited successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  
  /**
   * delete thoughts by specified id
   * @param {*} req request with thoughts id
   * @param {*} res 
   * @param {*} next 
   */
  export async function deleteThoughtsById(req, res, next) {
    try {
      await deleteThoughtsInstanceById(req.params.id);
      tempResponse.data.message = "thoughts deleted successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  