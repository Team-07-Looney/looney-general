import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the reasonss from reasonss table
 * @returns reasonss data from the database
 */
export async function getAllReasonData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = 'SELECT * FROM reasons';
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
 * executes SQL query that inserts values from the request into reasons table
 * @param {*} request request body with the data for a new reasons
 * @returns inserts into reasons
 */
export async function createReasonInstance(request) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const insert = 'INSERT INTO reasons (name, user_id) VALUES (?,?)';

    db.run(insert, [request.name, request.user_id], (err) => {
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
 * executes SQL query that retrieves reasons data based on specified id
 * @param {*} id id of a reasonss that needs to be retrieved
 * @returns reasons data
 */
export async function getReasonInstanceById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = `SELECT * FROM reasons WHERE id='${id}'`;

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
 * executes SQL query that looks for reasons with specified id in table reasons and updates it
 * @param {*} reasonsType new data of a reasons
 * @param {*} reasonsTypeId id of a reasons that needs to be updated
 * @returns updates a reason
 */
export async function editReasonInstanceById(reasonsType, reasonsTypeId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const update = `UPDATE reasons SET name='${reasonsType.name}' WHERE id=${reasonsTypeId}`;
    
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
 * executes SQL query that looks for reasons with specified id and deletes it from reasons table
 * @param {*} reasonsTypeId id of a reasons that needs to be deleted
 * @returns deletes a reason
 */
export async function deleteReasonInstanceById(reasonsTypeId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const query = `DELETE FROM reasons WHERE id='${reasonsTypeId}'`;
    
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
