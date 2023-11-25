import { openDatabaseConnection, closeDatabaseConnection } from './database.js';
import bcrypt from 'bcrypt';

export async function getAllUsers() {
  return new Promise((resolve, reject) => {
    let db = openDatabaseConnection();
    let sql = "SELECT * FROM users";
    let params = [];

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
  let hash = await bcrypt.hash(password, saltRounds);

  // Establishes connection with the db
  let db = openDatabaseConnection();
  const query = 'INSERT INTO users (username, email, password) VALUES (?,?,?)';

  return new Promise((resolve, reject) => {
    db.run(query, [name, email, hash], (err) => {
      // Closes the db connection 
      closeDatabaseConnection(db);

      if (err) {
        console.error(err.message);
        reject({
          code: 409,
          message: err.message
        });
      }

      // Check to make sure that the user has been sucessfully added
      const checkIfUserIsAddedQuery = `SELECT count(*) AS isUserCreated FROM users WHERE email = '${email}'`;
      db.get(checkIfUserIsAddedQuery, (err, row) => {
        // If the user has not been added succesfully
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

export async function getUserBy(key, value) {
  return new Promise((resolve, reject) => {
    const possibleKeys = ['id', 'email'];

    if (!possibleKeys.includes(key)) {
      reject(new Error("Invalid param for defining the user. Key must be 'id' or 'email'."));
      return;
    }

    let db = openDatabaseConnection();
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

