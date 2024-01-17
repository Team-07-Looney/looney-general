import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the records from records table
 * @returns records data from the database
 */
export async function getAllRecordData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = 'SELECT * FROM mood_records';
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
 * @returns creates a mood record
 */
export async function createRecordInstance(request) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const insert = 'INSERT INTO mood_records (mood_id, reason_id, user_id) VALUES (?, ?, ?)';
    db.run(insert, [request.mood_id, request.reason_id, request.user_id], (err) => {
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
 * executes SQL query that retrieves records data based on specified id
 * @param {*} id id of a records that needs to be retrieved
 * @returns records data
 */
export async function getRecordInstanceById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = `SELECT * FROM mood_records WHERE id='${id}'`;

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
 * executes SQL query that looks for record with specified id in table records and updates it
 * @param {*} record new data of a record
 * @param {*} recordId id of a record that needs to be updated
 * @returns updates a mood record
 */
export async function editRecordInstanceById(record, recordId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const update = `UPDATE mood_records SET mood_id='${record.mood_id}', reason_id='${record.reason_id}' WHERE id=${recordId}`;
    
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
 * executes SQL query that looks for record with specified id and deletes it from records table
 * @param {*} recordId id of a record that needs to be deleted
 * @returns deleted a mood record
 */
export async function deleteRecordInstanceById(recordId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const query = `DELETE FROM mood_records WHERE id='${recordId}'`;
    
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
