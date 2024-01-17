import sqlite3 from 'sqlite3';

export const DBSOURCE = './database/db.sqlite';

// Only testing database, DO NOT USE IN ANYTHING BUT JEST
let testingDatabase = new sqlite3.Database(':memory:');

/**
 * USED ONLY FOR TESTING WITH JEST
 * Refreshes the in memory database to allow fresh db every time
 * a new test is ran
 * @returns the testing database
 */
export async function refreshTestingDatabase() {
  return new Promise(async (resolve) => {
    testingDatabase = new sqlite3.Database(':memory:');
    await createCategoriesTable(testingDatabase);
    await createPredefinedCategoriesTable(testingDatabase);
    await createPredefinedHabitsTable(testingDatabase);
    await createHabitsTable(testingDatabase);
    await createHabitRecordsTable(testingDatabase);
    resolve(testingDatabase);
  });
}

/**
 * Establishes a connection with the habits database
 * @returns database
 */
export async function openDatabaseConnection() {
  return new Promise(async (resolve, reject) => {
    // Not the cleanest solution but works - NODE_ENV is set by npm test - refer to package.json
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'test') {
      await createCategoriesTable(testingDatabase);
      await createPredefinedCategoriesTable(testingDatabase);
      await createPredefinedHabitsTable(testingDatabase);
      await createHabitsTable(testingDatabase);
      await createHabitRecordsTable(testingDatabase);
      resolve(testingDatabase);
    }

    const db = new sqlite3.Database(DBSOURCE, (err) => {
      if (err) {
        console.error(err.message);
        reject(err.message);
      } else {
        console.log('Connected to SQLite database.');
      }

      // Runs a query to check if the tables exists and if not create one
      // Categories Table
      db.get('SELECT count(*) AS tableCategoriesExists FROM sqlite_master WHERE type="table" AND name="categories"', async (err, row) => {
        console.log(row);
        if (row.tableCategoriesExists == 0) {
          await createCategoriesTable(db);
        }

        resolve(db);
      });

      // Predefined Categories Table
      db.get('SELECT count(*) AS tablePredefinedCategoriesExists FROM sqlite_master WHERE type="table" AND name="predefined_categories"', async (err, row) => {
        // If there is no such table create one
        console.log(row);
        if (row.tablePredefinedCategoriesExists == 0) {
          await createPredefinedCategoriesTable(db);
        }

        resolve(db);
      });

      // Predefined Habits Table
      db.get('SELECT count(*) AS tablePredefinedHabitsExists FROM sqlite_master WHERE type="table" AND name="predefined_habits"', async (err, row) => {
        console.log(row);
        if (row.tablePredefinedHabitsExists == 0) {
          await createPredefinedHabitsTable(db);
        }

        resolve(db);
      });

      // Habits Table
      db.get('SELECT count(*) AS tableHabitsExists FROM sqlite_master WHERE type="table" AND name="habits"', async (err, row) => {
        console.log(row);
        if (row.tableHabitsExists == 0) {
          await createHabitsTable(db);
        }

        resolve(db);
      });

      // Habit Records Table
      db.get('SELECT count(*) AS tableHabitRecordsExists FROM sqlite_master WHERE type="table" AND name="habit_records"', async (err, row) => {
        console.log(row);
        if (row.tableHabitRecordsExists == 0) {
          await createHabitRecordsTable(db);
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
 *  Creates predefined categories table
 * @param {*} db 
 * @returns 
 */
async function createPredefinedCategoriesTable(db) {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE predefined_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon_id TEXT)`,
    (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
        reject(err.message);
      } else {
        console.log('Table predefined categories created.');

        const insertQuery = 'INSERT INTO predefined_categories (id, name, icon_id) VALUES (?,?,?)';

        const predefinedCategories = [
          { id: 1, name: 'Morning Routine', icon_id: '&#127765' },
          { id: 2,name: 'Afternoon Routine', icon_id: '&#127763' },
          { id: 3,name: 'Evening Routine', icon_id: '&#127761' },
          { id: 4,name: 'Anytime', icon_id: '&#127775' }
        ];

        predefinedCategories.forEach(({ id, name, icon_id }) => {
          db.run(insertQuery, [id, name, icon_id], (err) => {
            if (err) {
              console.error(`Error inserting data for category ${name}: `, err.message);
              reject(err.message);
            } else {
              console.log(`Data inserted for category: ${name}`);
            }
          });
        });

        console.log('Data inserted successfully in predefined categories');
        resolve();
      }
    });
  });
}


/**
 * Created predefined habits
 * @param {*} db 
 * @returns 
 */
async function createPredefinedHabitsTable(db) {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE predefined_habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL)`,
    (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
        reject(err.message);
      } else {
        console.log('Table predefined habits created.');

        // Insert Data
        const predefinedHabits = ['Brush Teeth', 'Eat Breakfast', 'Walk', 'Read', 'Workout', 'Eat Lunch', 'Study', 'Paint', 'Eat Dinner', 'Go Out'];
        const insertQuery = 'INSERT INTO predefined_habits (name) VALUES (?)';

        predefinedHabits.forEach((name) => {
          db.run(insertQuery, [name], (err) => {
            if (err) {
              console.error('Error inserting data for category ', err.message);
              reject(err.message);
            } else {
              console.log(`Data inserted for category: ${name}`);
              resolve();
            }
          });
        });
      }
    });
  });
}

/**
 * Creates a table for Categories and add predefined categories
 * @param {*} db 
 * @returns 
 */
async function createCategoriesTable(db) {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        user_id INTEGER,
        icon_id TEXT)`,
    (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
        reject(err.message);
      } else {
        console.log('Table habits created.');
        resolve();
      }
    });
  });
}

/**
 * The user_id is missing to be implemented
 * 
 * Creates asynchronously habits table
 * @param {*} db the database in which the table should be created
 */
// The function needs to be async because otherwise other functions were taking over
// priority (which were using the table in question) and would result in an error
async function createHabitsTable(db) {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, 
      start_time TEXT, 
      duration INTEGER,
      category_id INTEGER NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE)`,
    (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
        reject(err.message);
      } else {
        console.log('Table habits created.');
        resolve();
      }
    });
  });
}

/**
 * Created habit records table
 * @param {*} db 
 * @returns 
 */
async function createHabitRecordsTable(db) {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE habit_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id INTEGER NOT NULL,
      date TEXT,
      FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE)`,
    (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
        reject(err.message);
      } else {
        console.log('Table habit records created.');
        resolve();
      }
    });
  });
}
