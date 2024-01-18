/* eslint-disable no-undef */
import { openDatabaseConnection, closeDatabaseConnection, createCategoriesTable, refreshTestingDatabase } from '../../database/database';
import sqlite3 from 'sqlite3';

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
  }, 15000);
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
  }, 15000);

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
  }, 15000);
});

describe('creation of tables for habits ms', () => {
  test('successful creation of categories table', async () => {
    // Arrange
    const db = new sqlite3.Database(':memory:');

    // Act
    await createCategoriesTable(db);

    // Assert
    db.get('SELECT count(*) AS tableCategoriesExists FROM sqlite_master WHERE type=\'table\' AND name=\'categories\'', (err, row) => {
      expect(row.tableCategoriesExists).toBe(1);
    });
  }, 15000);
});
