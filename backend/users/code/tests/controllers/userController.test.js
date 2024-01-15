/* eslint-disable no-undef */
import { createUser, getUser, getUsers, updateUser } from '../../controllers/userController';
import { refreshTestingDatabase } from '../../database/database';

describe('get all users', () => {
  test('from the database', async () => {
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

    const req = {};
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await getUsers(req, res, next);
    const responseData = res.send.mock.calls[0][0];

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(responseData.data.length).toEqual(2);
  });
});

describe('get a user', () => {
  test('that exists via their email', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const insertData = [
      { username: 'John Doe', email: 'john@looney.nl', password: '123' },
    ];
    await Promise.all(insertData.map(async (user) => {
      const { username, email, password } = user;
      const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
      await db.run(query);
    }));

    const req = {
      params: {
        userEmail: insertData[0].email
      }
    };
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await getUser(req, res, next);
    const responseData = res.send.mock.calls[0][0];

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(responseData.data.username).toEqual(insertData[0].username);
    expect(responseData.data.email).toEqual(insertData[0].email);
    expect(responseData.data.password).toEqual(insertData[0].password);
  });

  test('that exists via their id', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const insertData = [
      { username: 'John Doe', email: 'john@looney.nl', password: '123' },
    ];
    await Promise.all(insertData.map(async (user) => {
      const { username, email, password } = user;
      const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
      await db.run(query);
    }));

    const req = {
      params: {
        userId: 1
      }
    };
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await getUser(req, res, next);
    const responseData = res.send.mock.calls[0][0];

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(responseData.data.username).toEqual(insertData[0].username);
    expect(responseData.data.email).toEqual(insertData[0].email);
    expect(responseData.data.password).toEqual(insertData[0].password);
  });

  test('with wrong key will throw an error', async () => {
    // Arrange
    await refreshTestingDatabase();

    const req = {
      params: {
        userName: 'John Doe'
      }
    };
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await getUser(req, res, next);
    const responseData = res.send.mock.calls[0][0];
    console.log(responseData);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(responseData.data).toEqual('The key for the user is not found');
  });

  test('that does not exist will throw an error', async () => {
    // Arrange
    await refreshTestingDatabase();

    const req = {
      params: {
        userEmail: 'john.doe@looney.nl'
      }
    };
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await getUser(req, res, next);
    const responseData = res.send.mock.calls[0][0];

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(responseData.data).toEqual('No user found with such key');
  });
});

describe('create a user', () => {
  test('with email that is valid and all parameters available', async () => {
    // Arrange
    await refreshTestingDatabase();

    const req = {
      body: {
        name: 'John Doe',
        email: 'john.doe@looney.nl',
        password: '123'
      }
    };
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await createUser(req, res, next);
    const responseData = res.send.mock.calls[0][0];

    // Assert
    expect(responseData.data.message).toEqual('Successfully added user');
    expect(responseData.data.email).toEqual(req.body.email);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('with email that is already taken', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const insertData = [
      { username: 'John Doe', email: 'john@looney.nl', password: '123' },
    ];
    await Promise.all(insertData.map(async (user) => {
      const { username, email, password } = user;
      const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
      await db.run(query);
    }));

    const req = {
      body: {
        name: 'Jane Doe',
        email: insertData[0].email,
        password: '123'
      }
    };
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await createUser(req, res, next);
    const responseData = res.send.mock.calls[0][0];

    // Assert
    expect(responseData.data).toEqual('SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email');
  });

  test('with missing parameters', async () => {
    // Arrange
    await refreshTestingDatabase();

    const req = {
      body: {
        name: 'John Doe',
        email: 'john.doe@looney.nl',
      }
    };
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await createUser(req, res, next);
    const responseData = res.send.mock.calls[0][0];
    console.log(responseData);

    // Assert
    expect(res.status).toHaveBeenCalledWith(409);
  });
});

describe('update a user', () => {
  test('and their password', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const insertData = [
      { username: 'John Doe', email: 'john@looney.nl', password: '123' },
    ];
    await Promise.all(insertData.map(async (user) => {
      const { username, email, password } = user;
      const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
      await db.run(query);
    }));

    const req = {
      params: {
        userId: 1
      },
      body: {
        key: 'password',
        value: '123'
      }
    };
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await updateUser(req, res, next);
    const responseData = res.send.mock.calls[0][0];

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(responseData.data.message).toEqual('Successfully updated the user\'s password');
    expect(responseData.data.userId).toEqual(req.params.userId);
  });

  test('and their id is not possible', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const insertData = [
      { username: 'John Doe', email: 'john@looney.nl', password: '123' },
    ];
    await Promise.all(insertData.map(async (user) => {
      const { username, email, password } = user;
      const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
      await db.run(query);
    }));

    const req = {
      params: {
        userId: 1
      },
      body: {
        key: 'id',
        value: '123'
      }
    };
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await updateUser(req, res, next);
    const responseData = res.send.mock.calls[0][0];

    // Assert
    expect(res.status).toHaveBeenCalledWith(409);
    expect(responseData.data).toEqual('Invalid param for updating the user. Currently only the password is allowed.');
  });
});

/**
 * Creates a mock response for the controller
 * @returns the mock response
 */
function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}
