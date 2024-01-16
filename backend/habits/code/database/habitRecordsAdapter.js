import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the habit records from records table
 * @returns habit records data from the database
 */
export async function getAllHabitRecordsData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = "SELECT * FROM habit_records";
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
 * executes SQL query that inserts values from the request into habit records table
 * @param {*} request request body with the data for a new record
 * @returns 
 */
export async function createHabitRecordInstance(request, date) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const lookForExistingHabitRecord = `SELECT * FROM habit_records WHERE date='${date}' AND habit_id=${request.habit_id}`;
    const insert = 'INSERT INTO habit_records (habit_id, date) VALUES (?,?)';

    db.all(lookForExistingHabitRecord, (err, rows) => {
      closeDatabaseConnection(db);

      if (err) {
        console.error(err);
        reject(err);
      } else if (rows.length === 0) {
        db.run(insert, [request.habit_id, date], (err) => {
          closeDatabaseConnection(db);

          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        resolve("This habit was already recorded today");
      }
    });
  });
}

/**
 * executes SQL query that retrieves records data based on specified id
 * @param {*} id id of a record that needs to be retrieved
 * @returns record data
 */
export async function getHabitRecordInstanceById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = `SELECT * FROM habit_records WHERE id='${id}'`;

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