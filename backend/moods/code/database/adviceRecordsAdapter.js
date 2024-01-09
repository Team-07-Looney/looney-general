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
