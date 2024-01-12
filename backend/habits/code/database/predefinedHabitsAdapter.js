import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the categories from categories table
 * @returns categories data from the database
 */
export async function getAllPredefinedHabitsData() {
    return new Promise(async (resolve, reject) => {
      const db = await openDatabaseConnection();
      const sql = "SELECT * FROM predefined_habits";
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
