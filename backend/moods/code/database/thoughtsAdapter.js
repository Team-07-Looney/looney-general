import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the thoughtss from thoughtss table
 * @returns thoughtss data from the database
 */
export async function getAllThoughtsData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = "SELECT * FROM Thoughts";
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
 * @returns 
 */
export async function createThoughtsInstance(request) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const insert = 'INSERT INTO Thoughts (title, body, record_id) VALUES (?, ?, 1)';

    db.run(insert, [request.title, request.body, request.record_id], (err) => {
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
export async function getThoughtsInstanceById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = `SELECT * FROM Thoughts WHERE id='${id}'`;

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
 * executes SQL query that looks for thoughts with specified id in table thoughtss and updates its values
 * @param {*} thoughts new data of a thoughts
 * @param {*} thoughtsId id of a thoughts that needs to be updated
 * @returns 
 */
export async function editThoughtsInstanceById(thoughts, thoughtsId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const update = `UPDATE Thoughts SET title='${thoughts.title}', body='${thoughts.body}', record_id='${thoughts.record_id}', WHERE id=${thoughtsId}`;
    
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
 * @returns 
 */
export async function deleteThoughtsInstanceById(thoughtsId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const query = `DELETE FROM Thoughts WHERE id='${thoughtsId}'`;
    
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
