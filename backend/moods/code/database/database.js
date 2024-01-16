import sqlite3 from 'sqlite3';

export const DBSOURCE = './database/db.sqlite';

// Define table creation queries
const tableQueries = [
  //Create mood_types table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS mood_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL)`,
  //Create moods table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS moods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mood_type_id INTEGER REFERENCES mood_types(id),
  name TEXT UNIQUE NOT NULL,
  user_id INTEGER)`,
  //Create reasons table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS reasons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  user_id INTEGER)`,
  //Create mood_records table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS mood_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reason_id INTEGER REFERENCES reasons(id),
  mood_id INTEGER REFERENCES moods(id),
  user_id INTEGER)`,
  //Create thoughts table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS thoughts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  body TEXT NOT NULL,
  location TEXT,
  record_id INTEGER REFERENCES mood_records(id),
  user_id INTEGER)`,
  //Create advice_groups table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS advice_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT)`,
  //Create advice table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS advice (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  group_id INTEGER REFERENCES advice_groups(id),
  mood_type_id INTEGER REFERENCES moods_types(id))`,
  //Create advice mood_records table if it doesn't exists
  `CREATE TABLE IF NOT EXISTS advice_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  advice_id INTEGER REFERENCES advice(id),
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

        db.get('SELECT count(*) AS tablemoodsExists FROM sqlite_master WHERE type=\'table\' AND name=\'moods\'', async (err, row) => {
          // If there is no such table create one
          if (row.tablemoodsExists == 0) {
            // Use a separate async function within the callback
            await createTables(db);
            await populateMoodsTypeTable(db);
            await populateMoodsTable(db);
            await populateReasonsTable(db);
            await populateadviceGroupsTable(db);
            await populateadviceTable(db);
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

/**
 * @param {*} db The database in which the table should be created
 * @returns populates the moods types table
 */
async function populateMoodsTypeTable(db) {
  return new Promise((resolve, reject) => {
    const predefinedMoodTypes = ['Positive', 'Neutral', 'Negative'];
    const insertQuery = 'INSERT INTO mood_types (name) VALUES (?)';

    predefinedMoodTypes.forEach((name) => {
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

/**
 * @param {*} db The database in which the table should be created
 * @returns populates the moods table
 */
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
    const insertQuery = 'INSERT INTO moods (mood_type_id, name, user_id) VALUES (?,?,?)';
    predefinedMooods.forEach((mood) => {
      db.run(insertQuery, [mood.moodTypeId, mood.name, mood.user_id], (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  });
}

/**
 * @param {*} db The database in which the table should be created
 * @returns populates the reasons table
 */
async function populateReasonsTable(db) {
  return new Promise((resolve, reject) => {
    const predefinedreasons = ['Weather', 'Family', 'Friends', 'School', 'Pets', 'Food', 'Travel'];
    const insertQuery = 'INSERT INTO reasons (name, user_id) VALUES (?,?)';

    predefinedreasons.forEach((reason) => {
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

/**
 * @param {*} db The database in which the table should be created
 * @returns populates the advice groups table
 */
async function populateadviceGroupsTable(db) {
  return new Promise((resolve, reject) => {
    const predefinedadviceGroups = [
      {
        id: 1,
        name: 'Me Time'
      },
      {
        id: 2,
        name: 'Entertainment'
      },
      {
        id: 3,
        name: 'Well-being'
      },
      {
        id: 4,
        name: 'New Challenge'
      },
      {
        id: 5,
        name: 'Social'
      }
    ];
  
    const insertQuery = 'INSERT INTO advice_groups (id, name) VALUES (?,?)';
    predefinedadviceGroups.forEach((adviceGroups) => {
      db.run(insertQuery, [adviceGroups.id, adviceGroups.name], (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  });
}

/**
 * @param {*} db The database in which the table should be created
 * @returns populates the advice table
 */
async function populateadviceTable(db) {
  return new Promise((resolve, reject) => {
    const predefinedadvice = [
      {
        name: 'Read a Book',
        groupId: 1,
        moodTypeId: 1
      },
      {
        name: 'Art and Craft',
        groupId: 2,
        moodTypeId: 1
      },
      {
        name: 'Do Yoga',
        groupId: 3,
        moodTypeId: 1
      },
      {
        name: 'Try a new Recipe',
        groupId: 4,
        moodTypeId: 1
      },
      {
        name: 'Go to a Café',
        groupId: 5,
        moodTypeId: 1
      },
      {
        name: 'Bake Muffins',
        groupId: 1,
        moodTypeId: 2
      },
      {
        name: 'Movie Night',
        groupId: 2,
        moodTypeId: 2
      },
      {
        name: 'Outdoor Walk',
        groupId: 3,
        moodTypeId: 2
      },
      {
        name: 'Try new Outfits',
        groupId: 4,
        moodTypeId: 2
      },
      {
        name: 'Talk to a Friend',
        groupId: 5,
        moodTypeId: 2
      },
      {
        name: 'Warm Bath',
        groupId: 1,
        moodTypeId: 3
      },
      {
        name: 'Listen to Music',
        groupId: 2,
        moodTypeId: 3
      },
      {
        name: 'Meditate',
        groupId: 3,
        moodTypeId: 3
      },
      {
        name: 'Explore a Park',
        groupId: 4,
        moodTypeId: 3
      },
      {
        name: 'Call Family',
        groupId: 5,
        moodTypeId: 3
      }
    ];
    const insertQuery = 'INSERT INTO advice (name, group_id, mood_type_id) VALUES (?,?,?)';
    predefinedadvice.forEach((advice) => {
      db.run(insertQuery, [advice.name, advice.groupId, advice.moodTypeId], (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  });
}
