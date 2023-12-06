import sqlite3 from 'sqlite3';

export const DBSOURCE = "./database/db.sqlite";

// Define table creation queries
const tableQueries = [
//Create Mood_Types table if it doesn't exists
`CREATE TABLE IF NOT EXISTS Mood_Types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL)`,
//Create Moods table if it doesn't exists
 `CRAETE TABLE IF NOT EXISTS Moods (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     mood_type_id INTEGER FOREIGN KEY REFERENCES Mood_Types(id),
     name TEXT UNIQUE NOT NULL)`,
//Create Reasons table if it doesn't exists
 `CREATE TABLE IF NOT EXISTS Reasons (
     id PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL)`,
//Create Records table if it doesn't exists
 `CREATE TABLE IF NOT EXISTS Records (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER,
     reason_id INTEGER FOREIGN KEY REFERENCES Reasons(id),
     mood_id INTEGER FOREING KEY REFERENCES Moods(id))`,
//Create Thoughts table if it doesn't exists
 `CREATE TABLE IF NOT EXISTS Thoughts (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     title TEXT,
     body TEXT NOT NULL,
     record_id INTEGER FOREIGN KEY REFERENCES Records(id))`
];

/**
 * Establishes a connection with the habits database
 * @returns database
 */
export async function openDatabaseConnection() {
  return new Promise(async (resolve, reject) => {
    const db = new sqlite3.Database(DBSOURCE, async (err) => {
      if (err) {
        console.error(err.message);
        reject(err.message);
      } else {
        console.log('Connected to SQLite database.');
      }

      try {
        // Use a separate async function within the callback
        await createTables(db);
        resolve(db);
      } catch (error) {
        reject(error);
      }
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
 * Creates tables if they don't exist
 * @param {*} db The database in which the tables should be created
 */
async function createTables(db) {
  // Use Promise.all to await all promises in parallel
  await Promise.all(tableQueries.map(query => createTableIfNotExists(db, query)));
}

/**
 * Creates a table if it doesn't exist
 * @param {*} db The database in which the table should be created
 * @param {string} query The SQL query for table creation
 */
async function createTableIfNotExists(db, query) {
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
        reject(err.message);
      } else {
        console.log('Table created or already exists.');
        resolve();
      }
    });
  });
}