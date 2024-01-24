/* eslint-disable no-undef */
import { openDatabaseConnection, closeDatabaseConnection, createTables, refreshTestingDatabase, populateMoodsTable, populateMoodsTypeTable, populateReasonsTable, populateAdviceTable, populateAdviceGroupsTable } from '../../database/database';
import sqlite3 from 'sqlite3';

let db; // Declare a variable to store the database connection

beforeAll(async () => {
  // Open the database connection before any tests in the suite
  db = await openDatabaseConnection();
});

afterAll(() => {
  // Close the database connection after all tests in the suite
  closeDatabaseConnection(db);
});

describe('database connection opening', () => {
  test('successful opening a database connection and existence of moods table', async () => {
    // Arrange + Act
    await refreshTestingDatabase();
  
    // Assert
    expect(db).toBeInstanceOf(sqlite3.Database);

    db.get('SELECT count(*) AS tableMoodsExists FROM sqlite_master WHERE type=\'table\' AND name=\'moods\'', (err, row) => {
      expect(row.tableMoodsExists).toBe(1);
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
    closeDatabaseConnection(db, () => {
      // Assert
      expect(console.error).not.toHaveBeenCalled();
    });
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
    closeDatabaseConnection(mockDatabase, () => {
      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error on close');
      consoleErrorSpy.mockRestore();
    });
  });
});

describe('creation of tables for moods ms', () => {
  test('successful creation of tables for moods ms', async () => {
    // Arrange
    const db = new sqlite3.Database(':memory:');

    // Act
    await createTables(db);
    await populateMoodsTypeTable(db);
    await populateMoodsTable(db);
    await populateReasonsTable(db);
    await populateAdviceGroupsTable(db);
    await populateAdviceTable(db);
    // Assert
    db.get('SELECT count(*) AS tableMoodsExists FROM sqlite_master WHERE type=\'table\' AND name=\'moods\'', (err, row) => {
      expect(row.tableMoodsExists).toBe(1);
    });
  });
});

test('no additional tables created when creating table moods if it already exists', async () => {
  // Arrange
  await refreshTestingDatabase();
  const db = await openDatabaseConnection();

  // Act
  await createTables(db);
  // Assert
  db.get('SELECT count(*) AS tableMoodsExists FROM sqlite_master WHERE type=\'table\' AND name=\'moods\'', (err, row) => {
    expect(row.tableMoodsExists).toBe(1);
  });
});
