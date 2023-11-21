import { db } from './database.js';

export async function getAllHabitsData() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM habits";
    const params = [];

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

export async function createHabitInstance(request) {
  return new Promise((resolve, reject) => {
    const insert = 'INSERT INTO habits (name, start_time, duration) VALUES (?,?,?)';

    db.run(insert, [request.body.name, request.body.start_time, request.body.duration], (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}