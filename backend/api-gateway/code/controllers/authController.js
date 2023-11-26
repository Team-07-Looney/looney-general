import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../variables.env' });

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

export async function register(req, res) {
  try {
    console.log(req);
    const createUserResponse = await axios.post('http://msusers:3012/users', {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const getUserResponse = await axios.get(`http://msusers:3012/users/email/${createUserResponse.data.data.email}`);
    let token = createToken(getUserResponse.data.data.id);
    tempResponse.data.token = token;

    console.log(token);
    res.status(200).send(tempResponse);

  } catch (err) {
    tempResponse.data.message = 'Issue with the registration occurred';
    tempResponse.data.details = err.response.data.data;
    console.log(tempResponse);
    res.status(409).send(tempResponse);
  }
}

const maxAge = 3 * 24 * 60 * 60;

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
}