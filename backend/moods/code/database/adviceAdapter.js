import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the advice from advice table
 * @returns advice data from the database
 */
export async function getAllAdviceData() {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabaseConnection();
    const sql = "SELECT * FROM Advice";
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
