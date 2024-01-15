/* eslint-disable no-undef */
import { createNewUser, getAllUsers, getUserBy } from '../../database/adapter';
import { refreshTestingDatabase } from '../../database/database';

describe('getting all users from the database', () => {
  test('successfully retrieve all users in the database', async () => {
    // Arrange
    const db = await refreshTestingDatabase();

    const insertData = [
      { username: 'John Doe', email: 'john@looney.nl', password: '123' },
      { username: 'Jane Doe', email: 'jane@looney.nl', password: '456' },
    ];

    await Promise.all(insertData.map(async (user) => {
      const { username, email, password } = user;
      const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
      await db.run(query);
    }));

    // Act
    const users = await getAllUsers();

    // Assert
    expect(users.length).toBe(insertData.length);
  });
});

describe('adding new users to the database', () => {
  test('successfully adding a new user to the database', async () => {
    // Arrange
    await refreshTestingDatabase();
    const userData = { username: 'John Doe', email: 'john@looney.nl', password: '123' };

    // Act
    const response = await createNewUser(userData.username, userData.email, userData.password);

    // Assert
    expect(response).toEqual({
      code: 200,
      message: 'Successfully added user',
      email: userData.email
    });
  });

  test('failing to add a new user to the database with the same email', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const userData = { username: 'John Doe', email: 'john@looney.nl', password: '123' };
    const query = `INSERT INTO users (username, email, password) VALUES ("${userData.username}", "${userData.email}", "${userData.password}")`;
    await db.run(query);

    // Act + Assert
    await expect(
      createNewUser(userData.username, userData.email, userData.password))
      .rejects.toEqual({
        code: 409,
        message: 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email'
      });
  });
});

describe('getting users from the database', () => {
  test('selecting the user by email from the database if they exist', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const userData = { username: 'John Doe', email: 'john@looney.nl', password: '123' };
    const query = `INSERT INTO users (username, email, password) VALUES ("${userData.username}", "${userData.email}", "${userData.password}")`;
    await db.run(query);

    // Act 
    const response = await getUserBy('email', userData.email);

    // Assert
    expect(response).toEqual({
      id: 1,
      username: userData.username,
      email: userData.email,
      password: userData.password
    });
  });

  test('selecting the user by id from the database if they exist', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const userData = { username: 'John Doe', email: 'john@looney.nl', password: '123' };
    const query = `INSERT INTO users (username, email, password) VALUES ("${userData.username}", "${userData.email}", "${userData.password}")`;
    await db.run(query);

    // Act 
    const response = await getUserBy('id', 1);

    // Assert
    expect(response).toEqual({
      id: 1,
      username: userData.username,
      email: userData.email,
      password: userData.password
    });
  });

  test('failing when selecting the user by key different from email or id', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const userData = { username: 'John Doe', email: 'john@looney.nl', password: '123' };
    const query = `INSERT INTO users (username, email, password) VALUES ("${userData.username}", "${userData.email}", "${userData.password}")`;
    await db.run(query);

    // Act + Assert
    await expect(getUserBy('username', userData.username))
      .rejects.toThrowError('Invalid param for defining the user. Key must be \'id\' or \'email\'.');
  });

  test('receiving empty response when selecting user that does not exists', async () => {
    // Arrange
    await refreshTestingDatabase();
    const userData = { username: 'John Doe', email: 'john@looney.nl', password: '123' };

    // Act
    const response = await getUserBy('email', userData.email);

    // Assert
    expect(response).toBeUndefined();
  });
});
