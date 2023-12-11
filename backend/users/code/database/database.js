import sqlite3 from 'sqlite3';

export let DBSOURCE = "./database/db.sqlite"

/**
 * When running unit tests with npm test it uses the memory database instead of the 
 * sqlite file ./database/db.sqlite
 */
if (process.env.NODE_ENV === 'test') {
  DBSOURCE = ":memory:";
}

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
      }

      // Runs a query to check if the users table exists
      db.get("SELECT count(*) AS tableUsersExists FROM sqlite_master WHERE type='table' AND name='users'", async (err, row) => {
        // If there is no such table create one
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
    }
  });
}


/**
 * Creates asynchronously users table
 * @param {*} db the database in which the table should be created
 */
// The function needs to be async because otherwise other functions were taking over
// priority (which were using the table in question) and would result in an error
export async function createTable(db) {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL, 
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL)`,
      (err) => {
        if (err) {
          console.error('Error creating table: ', err.message);
          console.log('Error creating table: ', err.message);
          reject(err.message);
        } else {
          console.log('Table users created.');
          resolve();
        }
      });
  })
}