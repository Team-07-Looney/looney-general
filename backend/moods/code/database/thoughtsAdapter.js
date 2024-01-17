import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the thoughtss from thoughtss table
 * @returns thoughts data from the database
 */
export async function getAllThoughtData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = 'SELECT * FROM thoughts';
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
 * executes SQL query that retrieves the latest thoughts based on every user
 * @returns the latest thought
 */
export async function getLatestThoughtsInstances() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = 'SELECT title, body, location, user_id, MAX(id) FROM thoughts WHERE location IS NOT NULL GROUP BY user_id';
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
 * executes SQL query that inserts values from the request into thoughtss table
 * @param {*} request request body with the data for a new thoughts
 */
export async function createThoughtInstance(request) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const insert = 'INSERT INTO thoughts (title, body, location, record_id, user_id) VALUES (?, ?, ?, ?,?)';

    db.run(insert, [
      request.title, request.body, request.location, request.record_id, request.user_id], (err) => {
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
 * executes SQL query that retrieves thoughts data based on specified id
 * @param {*} id id of a thoughtss that needs to be retrieved
 * @returns thoughts data
 */
export async function getThoughtInstanceById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = `SELECT * FROM thoughts WHERE id='${id}'`;

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
 * executes SQL query that looks for thoughts with specified id in table thoughts and updates it
 * @param {*} thoughts new data of a thoughts
 * @param {*} thoughtsId id of a thoughts that needs to be updated
 * @returns edits a thought
 */
export async function editThoughtInstanceById(thoughts, thoughtsId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const update = `UPDATE thoughts SET title='${thoughts.title}', body='${thoughts.body}', record_id='${thoughts.record_id}' WHERE id=${thoughtsId}`;
    
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
 * executes SQL query that looks for thoughts with specified id and deletes it from thoughtss table
 * @param {*} thoughtsId id of a thoughts that needs to be deleted
 */
export async function deleteThoughtInstanceById(thoughtsId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const query = `DELETE FROM thoughts WHERE id='${thoughtsId}'`;
    
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
