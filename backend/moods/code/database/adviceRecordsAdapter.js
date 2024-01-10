import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the advice records from advice records table
 * @returns advice records data from the database
 */
export async function getAllAdviceRecordsData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = "SELECT * FROM Advice_Records";
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
 * executes SQL query that inserts values from the request into advice_records table
 * @param {*} request request body with the data for a new advice record
 * @returns 
 */
export async function createAdviceRecordInstance(request) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const insert = 'INSERT INTO Advice_Records (advice_id, user_id) VALUES (?, ?)';

    db.run(insert, [request.advice_id, request.user_id], (err) => {
      closeDatabaseConnection(db);
      console.log(request.advice_id);
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}