import sqlite3 from 'sqlite3';

export const DBSOURCE = "./database/db.sqlite"

/**
 * Establishes a connection with the users database
 * @returns database
 */
export async function openDatabaseConnection() {
  return new Promise(async (resolve, reject) => {
    const db = new sqlite3.Database(DBSOURCE, (err) => {
      if (err) {
        console.error(err.message);
        reject(err.message);
      } else {
        console.log('Connected to SQLite database.');
      }

      // Runs a query to check if the users table exists
      db.get("SELECT count(*) AS tableUsersExists FROM sqlite_master WHERE type='table' AND name='users'", async (err, row) => {
        // If there is no such table create one
        console.log(row);
        if (row.tableUsersExists == 0) {
          await createTable(db);
        }

        resolve(db);
      });
    });
  });
}

/**
 * Closes the established relationship with the database
 * @param {*} db The database that needs to be closed
 */
export function closeDatabaseConnection(db) {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Closed the SQLite database connection.');
    }
  });
}


/**
 * Creates asynchronously users table
 * @param {*} db the database in which the table should be created
 */
// The function needs to be async because otherwise other functions were taking over
// priority (which were using the table in question) and would result in an error
async function createTable(db) {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL, 
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL)`,
      (err) => {
        console.log('here? vol2');

        if (err) {
          console.error('Error creating table: ', err.message);
          reject(err.message);
        } else {
          console.log('Table users created.');
          resolve();
        }
      });
  })
}