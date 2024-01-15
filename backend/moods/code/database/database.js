import sqlite3 from 'sqlite3';

export const DBSOURCE = "./database/db.sqlite";

// Define table creation queries
const tableQueries = [
  //Create Mood_Types table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS Mood_Types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL)`,
  //Create Moods table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS Moods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mood_type_id INTEGER REFERENCES Mood_Types(id),
  name TEXT UNIQUE NOT NULL,
  user_id INTEGER)`,
  //Create Reasons table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS Reasons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  user_id INTEGER)`,
  //Create Records table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS Records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reason_id INTEGER REFERENCES Reasons(id),
  mood_id INTEGER REFERENCES Moods(id))`,
  //Create Thoughts table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS Thoughts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  body TEXT NOT NULL,
  location TEXT,
  record_id INTEGER REFERENCES Records(id),
  user_id INTEGER)`
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

        db.get("SELECT count(*) AS tableMoodsExists FROM sqlite_master WHERE type='table' AND name='Moods'", async (err, row) => {
          // If there is no such table create one
          if (row.tableMoodsExists == 0) {
            // Use a separate async function within the callback
            await createTables(db);
            await populateMoodsTypeTable(db);
            await populateMoodsTable(db);
            await populateReasonsTable(db);
          }

          resolve(db);
        });
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

async function populateMoodsTypeTable(db) {
  return new Promise((resolve, reject) => {
    const predefinedCategories = ['Positive', 'Neutral', 'Negative'];
    const insertQuery = 'INSERT INTO Mood_Types (name) VALUES (?)';

    predefinedCategories.forEach((name) => {
      db.run(insertQuery, [name], (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  });
}

async function populateMoodsTable(db) {
  return new Promise((resolve, reject) => {
    const predefinedMooods = [
      {
        moodTypeId: 1,
        name: 'Joyful'
      },
      {
        moodTypeId: 1,
        name: 'Excited'
      },
      {
        moodTypeId: 1,
        name: 'Greatful'
      },
      {
        moodTypeId: 1,
        name: 'Optimistic'
      },
      {
        moodTypeId: 1,
        name: 'Playful'
      },
      {
        moodTypeId: 2,
        name: 'Calm'
      },
      {
        moodTypeId: 2,
        name: 'Indifferent'
      },
      {
        moodTypeId: 2,
        name: 'Thoughtful'
      },
      {
        moodTypeId: 2,
        name: 'Reserved'
      },
      {
        moodTypeId: 2,
        name: 'Tolerant'
      },
      {
        moodTypeId: 3,
        name: 'Gloomy'
      },
      {
        moodTypeId: 3,
        name: 'Agitated'
      },
      {
        moodTypeId: 3,
        name: 'Overwhelmed'
      },
      {
        moodTypeId: 3,
        name: 'Disappointed'
      },
      {
        moodTypeId: 3,
        name: 'Iritated'
      }
    ];
    const insertQuery = 'INSERT INTO Moods (mood_type_id, name, user_id) VALUES (?,?,?)';
    predefinedMooods.forEach((mood) => {
      db.run(insertQuery, [mood.moodTypeId, mood.name, mood.user_id], (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    })
  });
}

async function populateReasonsTable(db) {
  return new Promise((resolve, reject) => {
    const predefinedReasons = ['Weather', 'Family', 'Friends', 'School', 'Pets', 'Food', 'Travel'];
    const insertQuery = 'INSERT INTO Reasons (name, user_id) VALUES (?,?)';

    predefinedReasons.forEach((reason) => {
      db.run(insertQuery, [reason], (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  });
}