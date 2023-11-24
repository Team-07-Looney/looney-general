import { createNewUser, getAllUsers, getUserBy } from '../database/adapter.js';

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

export async function getUsers(req, res) {
  try {
    tempResponse.data = await getAllUsers();
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res) {
  try {
    let key = req.body.id ? 'id' : (req.body.email ? 'email' : '');
    let value = req.body.id ? req.body.id : (req.body.email ? req.body.email : '');

    tempResponse.data = await getUserBy(key, value);
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res) {
  try {
    const response = await createNewUser(req.body.name, req.body.email, req.body.password);
    console.log(response);

    if (response == 200) {
      tempResponse.data.status = "Success";
      tempResponse.data.message = "User is successfully added";
      tempResponse.data.email = req.body.email;
    } else {
      tempResponse.data.message = "Error";
    }

    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}