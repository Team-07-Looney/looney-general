import sqlite3 from 'sqlite3';

export const DBSOURCE = "./database/db.sqlite"

/**
 * Establishes a connection with the users database
 * @returns database
 */
export function openDatabaseConnection() {
  // Retrieves the database
  const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to SQLite database.');
    }
  });

  // Runs a query to check if the users table exists
  db.get("SELECT count(*) AS tableUsersExists FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
    // If there is no such table create one
    if (row.tableUsersExists == 0) {
      createTable(db);
    }
  });

  return db;
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
 * Creates users table
 * @param {*} db the database in which the table should be created
 */
function createTable(db) {
  db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL, 
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL)`,
    (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
      } else {
        console.log('Table users created.');
      }
    });
}