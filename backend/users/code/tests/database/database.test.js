/* eslint-disable no-undef */
import { openDatabaseConnection, closeDatabaseConnection, createTable, refreshTestingDatabase } from '../../database/database';
import sqlite3 from 'sqlite3';

describe('database connection opening', () => {
  test('successful opening a database connection and existence of users table', async () => {
    // Arrange + Act
    await refreshTestingDatabase();
    const db = await openDatabaseConnection();

    // Assert
    expect(db).toBeInstanceOf(sqlite3.Database);

    db.get('SELECT count(*) AS tableUsersExists FROM sqlite_master WHERE type=\'table\' AND name=\'users\'', (err, row) => {
      expect(row.tableUsersExists).toBe(1);
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

describe('creation of table users', () => {
  test('successful creation of table users', async () => {
    // Arrange
    const db = new sqlite3.Database(':memory:');

    // Act
    await createTable(db);

    // Assert
    db.get('SELECT count(*) AS tableUsersExists FROM sqlite_master WHERE type=\'table\' AND name=\'users\'', (err, row) => {
      expect(row.tableUsersExists).toBe(1);
    });
  });

  test('no additional tables created when creating table users if it already exists', async () => {
    // Arrange
    await refreshTestingDatabase();
    const db = await openDatabaseConnection();

    // Act
    await createTable(db);

    // Assert
    db.get('SELECT count(*) AS tableUsersExists FROM sqlite_master WHERE type=\'table\' AND name=\'users\'', (err, row) => {
      expect(row.tableUsersExists).toBe(1);
    });
  });
});
