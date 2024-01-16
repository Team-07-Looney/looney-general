import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the habits from habits table
 * @returns habits data from the database
 */
export async function getAllHabitsData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = 'SELECT * FROM habits';
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
 * executes SQL query that inserts values from the request into habits table
 * @param {*} request request body with the data for a new habit
 * @returns 
 */
export async function createHabitInstance(request) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const insert = 'INSERT INTO habits (name, start_time, duration, category_id) VALUES (?,?,?,?)';

    db.run(insert, [request.name, request.start_time,
      request.duration, request.category_id], (err) => {
      closeDatabaseConnection(db);

      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * executes SQL query that retrieves habit data based on specified id
 * @param {*} id id of a habit that needs to be retrieved
 * @returns habit data
 */
export async function getHabitInstanceById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = `SELECT * FROM habits WHERE id='${id}'`;

    db.all(sql, (err, row) => {
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
 * executes SQL query that looks for habit with specified id in table habits and updates its values
 * @param {*} habit new data of a habit
 * @param {*} habitId id of a habit that needs to be updated
 * @returns 
 */
export async function editHabitInstanceById(habit, habitId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const update = `UPDATE habits SET name='${habit.name}', start_time='${habit.start_time}', duration='${habit.duration}' WHERE id=${habitId}`;
    
    db.run(update, (err) => {
      closeDatabaseConnection(db);

      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * executes SQL query that looks for habit with specified id and deletes it from habits table
 * @param {*} habitId id of a habit that needs to be deleted
 * @returns 
 */
export async function deleteHabitInstanceById(habitId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const query = `DELETE FROM habits WHERE id='${habitId}'`;
    
    db.run(query, (err) => {
      closeDatabaseConnection(db);

      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
