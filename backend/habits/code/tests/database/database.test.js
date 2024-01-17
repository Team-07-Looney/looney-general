/* eslint-disable no-undef */
import { openDatabaseConnection, closeDatabaseConnection, createCategoriesTable, createHabitsTable, createHabitRecordsTable, refreshTestingDatabase } from '../../database/database';

describe('database connection opening', () => {
  test('successful opening a database connection and existence of habits table', async () => {
    // Arrange + Act
    await refreshTestingDatabase();
    const db = await openDatabaseConnection();

    // Assert
    expect(db).toBeInstanceOf(sqlite3.Database);

    db.get('SELECT count(*) AS tableCategoriesExists FROM sqlite_master WHERE type=\'table\' AND name=\'categories\'', (err, row) => {
      expect(row.tableCategoriesExists).toBe(1);
    });
    db.get('SELECT count(*) AS tableHabitsExists FROM sqlite_master WHERE type=\'table\' AND name=\'habits\'', (err, row) => {
      expect(row.tableHabitsExists).toBe(1);
    });
    db.get('SELECT count(*) AS tableHabitRecordsExists FROM sqlite_master WHERE type=\'table\' AND name=\'habit_records\'', (err, row) => {
      expect(row.tableHabitRecordsExists).toBe(1);
    });
  });
});

describe('database connection closing', () => {
  test('successful closing of a database connection', async () => {
    // Arrange
    await refreshTestingDatabase();
    const db = await openDatabaseConnection();
    console.error = jest.fn();

    // Act
    closeDatabaseConnection(db);

    // Assert
    expect(console.error).not.toHaveBeenCalled();
  });

  test('failure when closing a database connection', async () => {
    // Arrange
    const mockDatabase = {
      close: (callback) => {
        const error = new Error('Error on close');
        callback(error);
      }
    };
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Act
    closeDatabaseConnection(mockDatabase);

    // Assert
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error on close');
    consoleErrorSpy.mockRestore();
  });
});

describe('creation of tables for habits ms', () => {
  test('successful creation of tables for habits ms', async () => {
    // Arrange
    const db = new sqlite3.Database(':memory:');

    // Act
    await createCategoriesTable(db);
    await createHabitsTable(db);
    await createHabitRecordsTable(db);

    // Assert
    db.get('SELECT count(*) AS tableCategoriesExists FROM sqlite_master WHERE type=\'table\' AND name=\'categories\'', (err, row) => {
      expect(row.tableCategoriesExists).toBe(1);
    });
    db.get('SELECT count(*) AS tableHabitsExists FROM sqlite_master WHERE type=\'table\' AND name=\'habits\'', (err, row) => {
      expect(row.tableHabitsExists).toBe(1);
    });
    db.get('SELECT count(*) AS tableHabitRecordsExists FROM sqlite_master WHERE type=\'table\' AND name=\'habit_records\'', (err, row) => {
      expect(row.tableHabitRecordsExists).toBe(1);
    });
  });

  test('no additional tables created when creating table habits if it already exists', async () => {
    // Arrange
    await refreshTestingDatabase();
    const db = await openDatabaseConnection();

    // Act
    await createCategoriesTable(db);
    await createHabitsTable(db);
    await createHabitRecordsTable(db);

    // Assert
    db.get('SELECT count(*) AS tableCategoriesExists FROM sqlite_master WHERE type=\'table\' AND name=\'categories\'', (err, row) => {
      expect(row.tableCategoriesExists).toBe(1);
    });
    db.get('SELECT count(*) AS tableHabitsExists FROM sqlite_master WHERE type=\'table\' AND name=\'habits\'', (err, row) => {
      expect(row.tableHabitsExists).toBe(1);
    });
    db.get('SELECT count(*) AS tableHabitRecordsExists FROM sqlite_master WHERE type=\'table\' AND name=\'habit_records\'', (err, row) => {
      expect(row.tableHabitRecordsExists).toBe(1);
    });
  });
});
