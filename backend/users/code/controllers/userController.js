import { createNewUser, getAllUsers, getUserBy, updateUserWith } from '../database/adapter.js';

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

let tempResponse = {
  meta: {
    date: getToDay(),
  },
  data: {
    message: 'this route is not implemented yet',
  },
};

/**
 * Retrieves all users via the database adapter and returns them via req response
 * @param {*} req the request
 * @param {*} res the response
 * @param {*} next 
 */
export async function getUsers(req, res, next) {
  try {
    tempResponse = await freshResponse();
    tempResponse.data = await getAllUsers();
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieve a user based on the key sent within a request - userEmail or userId
 * @param {*} req the request
 * @param {*} res the response
 * @param {*} next 
 * @returns 
 */
export async function getUser(req, res, next) {
  try {
    tempResponse = await freshResponse();
    let retrievedData;

    if (req.params.userEmail) {
      retrievedData = await getUserBy('email', req.params.userEmail);
    } else if (req.params.userId) {
      retrievedData = await getUserBy('id', req.params.userId);
    } else {
      tempResponse.data = 'The key for the user is not found';
      res.status(404).send(tempResponse);
      return;
    }

    if (!retrievedData) {
      tempResponse.data = "No user found with such key";
      res.status(404).send(tempResponse);
    } else {
      tempResponse.data = retrievedData;
      res.status(200).send(tempResponse);
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Handles the creation a new user when a request is called
 * @param {*} req The POST request 
 * @param {*} res The response
 * @param {*} next 
 */
export async function createUser(req, res, next) {
  try {
    tempResponse = await freshResponse();

    tempResponse.data = await createNewUser(req.body.name, req.body.email, req.body.password);
    res.status(200).send(tempResponse);
  } catch (err) {
    // Handle the reject of the promise
    tempResponse.data = err.message;
    res.status(409).send(tempResponse);
  }
}

export async function updateUser(req, res, next) {
  try {
    tempResponse = await freshResponse();

    const userId = req.params.userId;
    const key = req.body.key;
    const value = req.body.value;

    tempResponse = await freshResponse();
    tempResponse.data = await updateUserWith(userId, key, value);

    res.status(200).send(tempResponse);
  } catch (err) {
    tempResponse.data = err.message;
    res.status(409).send(tempResponse);
  }
}

async function freshResponse() {
  return {
    meta: {
      date: getToDay(),
    },
    data: {
      message: 'this route is not implemented yet',
    },
  };
}