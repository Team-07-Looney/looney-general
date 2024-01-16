import { 
    createThoughtInstance,
    getAllThoughtData,
    getThoughtInstanceById,
    getLatestThoughtsInstances,
    editThoughtInstanceById,
    deleteThoughtInstanceById
  } from '../database/thoughtsAdapter.js';
  
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
  export async function getThought(req, res, next) {
    try {
      const thoughts = await getAllThoughtData();
      
      const thoughtAPIResponse = thoughts.map(thought => ({
        ...thought,
        record_id: `/mood-records/${thought.record_id}`
      }))

      tempResponse.data = thoughtAPIResponse;

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
  export async function createThought(req, res, next) {
    try {
      await createThoughtInstance(req.body);
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
  export async function getThoughtById(req, res, next) {
    try {
      tempResponse.data = await getThoughtInstanceById(req.params.id);
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }

  /**
   * get the latest thoughts based on every user
   * @param {*} req request
   * @param {*} res response
   * @param {*} next 
   */
  export async function getLatestThoughts(req, res, next) {
    try {
      tempResponse.data = await getLatestThoughtsInstances();
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
  export async function editThoughtById(req, res, next) {
    try {
      await editThoughtInstanceById(req.body, req.params.id);
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
  export async function deleteThoughtById(req, res, next) {
    try {
      await deleteThoughtInstanceById(req.params.id);
      tempResponse.data.message = "thoughts deleted successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  