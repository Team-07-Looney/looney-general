import { openDatabaseConnection, closeDatabaseConnection } from './database.js';
import sqlite3 from 'sqlite3';
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

export async function createNewUser(name, email, password) {
  const saltRounds = 10;

  let hash = await bcrypt.hash(password, saltRounds);
  let db = openDatabaseConnection();
  const query = 'INSERT INTO users (username, email, password) VALUES (?,?,?)';

  return new Promise((resolve, reject) => {
    db.run(query, [name, email, hash], (err) => {
      closeDatabaseConnection(db);
      if (err) {
        console.error(err);
        reject(409);
      }

      resolve(200);
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
    const query = `SELECT * FROM users WHERE ${key} = ? LIMIT 1`;

    db.all(query, [value], (err, rows) => {
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

