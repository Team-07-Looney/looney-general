import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the records from records table
 * @returns records data from the database
 */
export async function getAllRecordsData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = "SELECT * FROM Records";
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
export async function createRecordsInstance(request) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const insert = 'INSERT INTO Records (user_id, reason_id, record_id) VALUES (1, 1, 1)';

    db.run(insert, [request.user_id, request.reason_id, request.record_id], (err) => {
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
export async function getRecordsInstanceById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = `SELECT * FROM Records WHERE id='${id}'`;

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
 * executes SQL query that looks for record with specified id in table records and updates its values
 * @param {*} record new data of a record
 * @param {*} recordId id of a record that needs to be updated
 * @returns 
 */
export async function editRecordsInstanceById(record, recordId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const update = `UPDATE Records SET user_id='${record.user_id}', mood_id='${record.mood_id}', reason_id='${record.reason_id}', WHERE id=${recordId}`;
    
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
 * @returns 
 */
export async function deleteRecordsInstanceById(recordId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const query = `DELETE FROM Records WHERE id='${recordId}'`;
    
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
