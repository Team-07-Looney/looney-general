import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the habits from habits table
 * @returns habits data from the database
 */
export async function getAllMoodTypeData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = "SELECT * FROM Mood_Types";
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
export async function createMoodTypeInstance(request) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const insert = 'INSERT INTO Mood_Types (name) VALUES (?)';

    db.run(insert, [request.name], (err) => {
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
 * executes SQL query that retrieves mood type data based on specified id
 * @param {*} id id of a mood types that needs to be retrieved
 * @returns mood type data
 */
export async function getMoodTypeInstanceById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = `SELECT * FROM Mood_Types WHERE id='${id}'`;

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
 * @param {*} moodType new data of a mood type
 * @param {*} moodTypeId id of a mood type that needs to be updated
 * @returns 
 */
export async function editMoodTypeInstanceById(moodType, moodTypeId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const update = `UPDATE Mood_Types SET name='${moodType.name}' WHERE id=${moodTypeId}`;
    
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
 * executes SQL query that looks for mood type with specified id and deletes it from habits table
 * @param {*} moodTypeId id of a mood type that needs to be deleted
 * @returns 
 */
export async function deleteMoodTypeInstanceById(moodTypeId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const query = `DELETE FROM Mood_Types WHERE id='${moodTypeId}'`;
    
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
