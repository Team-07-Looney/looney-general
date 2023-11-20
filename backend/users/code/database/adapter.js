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