import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the records from records table
 * @returns records data from the database
 */
export async function getAllRecordsData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = "SELECT * FROM records";
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
 * executes SQL query that inserts values from the request into records table
 * @param {*} request request body with the data for a new record
 * @returns 
 */
export async function createRecordInstance(request, date) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const lookForExistingRecord = `SELECT * FROM records WHERE date=${date} AND habit_id=${request.habit_id}`;
    const insert = 'INSERT INTO records (habit_id, date) VALUES (?,?)';

    db.all(lookForExistingRecord, (err, rows) => {
      closeDatabaseConnection(db);
      console.log(rows);

      if (err) {
        console.error(err);
        reject(err);
      } else if (!rows) {
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
        resolve("this habit was already recorded today");
      }
    });
  });
}

/**
 * executes SQL query that retrieves records data based on specified id
 * @param {*} id id of a record that needs to be retrieved
 * @returns record data
 */
export async function getRecordInstanceById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = `SELECT * FROM records WHERE id='${id}'`;

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