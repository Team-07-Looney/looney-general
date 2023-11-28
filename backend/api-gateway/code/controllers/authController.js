import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../variables.env' });

function getToDay() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
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
 * Handles the registration request for the user
 * @param {*} req the request
 * @param {*} res the response
 */
export async function register(req, res) {
  try {
    // Call the microservice function to create a user
    const createUserResponse = await axios.post('http://msusers:3012/users', {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Get the newly created user
    const getUserResponse = await axios.get(`http://msusers:3012/users/email/${createUserResponse.data.data.email}`);

    // Create a JWT token
    let token = createToken(getUserResponse.data.data.id);
    tempResponse.data.token = token;

    res.status(200).send(tempResponse);

  } catch (err) {
    tempResponse.data.message = 'Issue with the registration occurred';
    tempResponse.data.details = err.response.data.data;
    res.status(409).send(tempResponse);
  }
}

/**
 * Handles the login of the user
 * @param {*} req the request
 * @param {*} res the response
 */
export async function login(req, res) {
  try {
    // Get the current user
    const getUserResponse = await axios.get(`http://msusers:3012/users/email/${req.body.email}`);

    // Check the passwords that are matching
    if (getUserResponse.data.data.password) {

      // Compare the login password to the one from the database
      const auth = await bcrypt.compare(req.body.password, getUserResponse.data.data.password);
      if (auth) {
        // Create the JWT token
        let token = createToken(getUserResponse.data.data.id);
        tempResponse.data.token = token;

        tempResponse.data.message = 'Successful login';
        res.status(200).send(tempResponse);
      } else {
        tempResponse.data.message = 'Wrong credentials';
        res.status(401).send(tempResponse);
      }
    }
  } catch (err) {
    tempResponse.data.message = 'Issue with the credentials';
    res.status(409).send(tempResponse);
  }
}

/**
 * Creates a JWT token based on the id of the user and a secret
 * @param {*} id Id of the user
 * @returns the JWT token
 */
function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60
  });
}