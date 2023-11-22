import { db } from './database.js';

export async function getAllUsers() {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM users";
    var params = [];

    db.all(sql, params, (err, rows) => {
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
  const query = 'INSERT INTO users (username, email, password) VALUES (?,?,?)';
  db.run(query, [name, email, password], (err) => {
    if (err) {
      console.error(err);
    }
  });

  let newUser = await getUserBy('email', email);

  return new Promise((resolve, reject) => {
    resolve(newUser);
  });
}

export async function getUserBy(key, value) {
  return new Promise((resolve, reject) => {

    const possibleKeys = ['id', 'email'];
    if (!possibleKeys.includes(key)) {
      reject(new Error("Invalid param for defining the user. Key must be 'id' or 'email'."));
      return;
    }

    let query = `SELECT * FROM users WHERE ${key} = '${value}'`;

    db.all(query, (err, rows) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  })
}
