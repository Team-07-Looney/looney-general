import { getUsers } from "../../controllers/userController";
import { refreshTestingDatabase } from "../../database/database";

describe("get all users controller", () => {
  test('should retrieve all users from the database', async () => {
    // Arrange
    let db = await refreshTestingDatabase();
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
    console.log(responseData);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(responseData.data.length).toEqual(2);
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
};