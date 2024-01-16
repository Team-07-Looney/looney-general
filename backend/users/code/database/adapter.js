import { openDatabaseConnection, closeDatabaseConnection } from './database.js';
import bcrypt from 'bcrypt';

/**
 * Retrieves all the users from the database within a promise
 * @returns a promise with the rows
 */
export async function getAllUsers() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = 'SELECT * FROM users';
    const params = [];

    db.all(sql, params, (err, rows) => {
      closeDatabaseConnection(db);

      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

/**
 * Adds a new user based on the params send to the database
 * @param {*} name the username
 * @param {*} email unique email
 * @param {*} password raw text password
 * @returns a promise that says if it's been executed successfully
 */
export async function createNewUser(name, email, password) {
  const saltRounds = 12;

  // Using bcrypt alg to hash the password
  const hash = await bcrypt.hash(password, saltRounds);

  return new Promise(async (resolve, reject) => {
    // Establishes connection with the db
    const db = await openDatabaseConnection();
    const query = 'INSERT INTO users (username, email, password) VALUES (?,?,?)';

    // Run the insert query
    db.run(query, [name, email, hash], (err) => {
      if (err) {
        console.error(err.message);
        reject({
          code: 409,
          message: err.message
        });
      }

      // Check to make sure that the user has been successfully added
      const checkIfUserIsAddedQuery = `SELECT count(*) AS isUserCreated FROM users WHERE email = '${email}'`;
      db.get(checkIfUserIsAddedQuery, (err, row) => {
        // Closes the db connection 
        closeDatabaseConnection(db);

        // If the user has not been added successfully
        if (row.isUserCreated == 0 || err) {
          reject({
            code: 409,
            message: 'The user could not be added into the database'
          });
        }
      });

      resolve({
        code: 200,
        message: 'Successfully added user',
        email: email
      });
    });
  });
}

/**
 * Retrieves a user from the database based on key-value pair within a promise
 * @param {*} key Possible values: id, email
 * @param {*} value The value behind the key
 * @returns A user based on the matching of the key-value pair
 */
export async function getUserBy(key, value) {
  return new Promise(async (resolve, reject) => {
    // Preventing usage of other keys
    const possibleKeys = ['id', 'email'];

    if (!possibleKeys.includes(key)) {
      reject(new Error('Invalid param for defining the user. Key must be \'id\' or \'email\'.'));
      return;
    }

    // Establishing the db connection
    const db = await openDatabaseConnection();
    const query = `SELECT * FROM users WHERE ${key} = ?`;

    db.get(query, [value], (err, row) => {
      closeDatabaseConnection(db);
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

/**
 * Updates a user's details identified by their id
 * @param {*} id the id of the user
 * @param {*} key the parameter of the user that will be updated (only password currently allowed)
 * @param {*} value the value of the parameter
 * @returns status message if the update was successful
 */
export async function updateUserWith(id, key, value) {
  return new Promise(async (resolve, reject) => {
    const possibleKeys = ['password'];
    if (!possibleKeys.includes(key)) {
      reject(new Error('Invalid param for updating the user. Currently only the password is allowed.'));
      return;
    }

    const query = `UPDATE users SET ${key} = "${value}" WHERE id = ${id}`;

    const db = await openDatabaseConnection();
    db.run(query, function (err) {
      if (err) {
        console.error(err);
        reject({
          code: 403,
          message: 'Failed to update the user',
          userId: id,
          error: err.message // Include the specific error message
        });
      } else {
        resolve({
          code: 200,
          message: `Successfully updated the user's ${key}`,
          userId: id
        });
      }
    });
  });
}
