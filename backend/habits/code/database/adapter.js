import { db } from './database.js';

export async function getAllHabitsData() {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM habits";
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