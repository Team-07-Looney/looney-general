import sqlite3 from 'sqlite3';

export const DBSOURCE = "./database/db.sqlite"

/**
 * Establishes a connection with the user database
 * @returns database
 */
export function openDatabaseConnection() {
  const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.log(err);
    }

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