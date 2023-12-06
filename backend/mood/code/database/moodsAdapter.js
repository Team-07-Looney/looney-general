import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the habits from habits table
 * @returns habits data from the database
 */
export async function getAllMoodsData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = "SELECT * FROM Moods";
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
export async function createMoodsInstance(request) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const insert = 'INSERT INTO Moods (name, mood_type_id) VALUES (?, 1)';

    db.run(insert, [request.name, request.mood_type_id], (err) => {
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
 * executes SQL query that retrieves mood data based on specified id
 * @param {*} id id of a moods that needs to be retrieved
 * @returns mood data
 */
export async function getMoodsInstanceById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = `SELECT * FROM Moods WHERE id='${id}'`;

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
 * @param {*} mood new data of a mood
 * @param {*} moodId id of a mood that needs to be updated
 * @returns 
 */
export async function editMoodsInstanceById(mood, moodId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const update = `UPDATE Moods SET name='${mood.name}', mood_type_id='${mood.mood_type_id}' WHERE id=${moodId}`;
    
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
 * executes SQL query that looks for mood with specified id and deletes it from habits table
 * @param {*} moodId id of a mood that needs to be deleted
 * @returns 
 */
export async function deleteMoodsInstanceById(moodId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const query = `DELETE FROM Moods WHERE id='${moodId}'`;
    
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
