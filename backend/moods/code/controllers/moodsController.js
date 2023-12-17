import { 
    createMoodInstance,
    getAllMoodData,
    getMoodInstanceById,
    editMoodInstanceById,
    deleteMoodInstanceById
  } from '../database/moodsAdapter.js'
  
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
  export async function getMood(req, res, next) {
    try {
      const moods = await getAllMoodData();
      const moodAPIresponse = moods.map(mood => ({
        ...mood,
        mood_type_id:`/mood-types/${mood.mood_type_id}`
      }))
      tempResponse.data = moodAPIresponse;
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
  export async function createMood(req, res, next) {
    try {
      await createMoodInstance(req.body);
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
  export async function getMoodById(req, res, next) {
    try {
      const moodsById = await getMoodInstanceById(req.params.id);
      const moodsByIdAPIResponse = moodsById.map(moodById => ({
        ...moodById,
        mood_type_id:`/mood-types/${moodById.mood_type_id}`
      }))
      tempResponse.data = moodsByIdAPIResponse;
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
  export async function editMoodById(req, res, next) {
    try {
      await editMoodInstanceById(req.body, req.params.id);
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
  export async function deleteMoodById(req, res, next) {
    try {
      await deleteMoodInstanceById(req.params.id);
      tempResponse.data.message = "moods deleted successfully";
      res.status(200).send(tempResponse);
    } catch(err) {
      next(err);
    }
  }
  