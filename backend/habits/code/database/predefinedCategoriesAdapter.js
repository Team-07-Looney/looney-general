import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the categories from categories table
 * @returns categories data from the database
 */
export async function getAllPredefinedCategoriesData() {
    return new Promise(async (resolve, reject) => {
      const db = await openDatabaseConnection();
      const sql = "SELECT * FROM predefined_categories";
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
 * Inserts predefined category instances into the categories table
 * @param {Array} predefinedCategoriesData - Array of predefined categories data
 */
export async function createPredefinedCategoryInstances(predefinedCategoriesData, userId) {
    return new Promise(async (resolve, reject) => {
        const db = await openDatabaseConnection();
        const insert = 'INSERT INTO categories (name, user_id) VALUES (?,?)';

        // Iterate over each predefined category data and insert into the categories table
        for (const category of predefinedCategoriesData) {
            db.run(insert, [category.name, userId], (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
            });
        }

        closeDatabaseConnection(db);
        resolve();
    });
}
