/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { createAdviceRecord, getAdviceRecords } from '../../controllers/adviceRecordsController';
import { refreshTestingDatabase } from '../../database/database';
 
describe('get all advice records', () => {
  test('from the database', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const insertData = [
      { advice_id: 1, user_id: 2 },
      { advice_id: 3, user_id: 4 },
    ];
    await Promise.all(insertData.map(async (adviceRecord) => {
      const { advice_id, user_id } = adviceRecord;
      const query = `INSERT INTO advice_records (advice_id, user_id) VALUES ('${advice_id}', '${user_id}')`;
      await db.run(query);
    }));
 
    const req = {};
    const res = mockResponse();
    const next = jest.fn();
 
    // Act
    await getAdviceRecords(req, res, next);
    const responseData = res.send.mock.calls[0][0];
 
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(responseData.data.length).toEqual(2);
  });
});
 
describe('get an advice record', () => {
  test('that exists via their id', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const insertData = [
      { advice_id: 1, user_id: 2}
    ];
    await Promise.all(insertData.map(async (adviceRecord) => {
      const { advice_id, user_id } = adviceRecord;
      const query = `INSERT INTO advice_records (advice_id, user_id) VALUES ('${advice_id}', '${user_id}')`;
      await db.run(query);
    }));
 
    const req = {
      params: {
        id: insertData[0].advice_id
      }
    };
    const res = mockResponse();
    const next = jest.fn();
 
    // Act
    await getAdviceRecords(req, res, next);
    const responseData = res.send.mock.calls[0][0];
 
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(responseData.data[0].advice_id).toEqual(insertData[0].advice_id);
  });
});
 
test('that exists via their id', async () => {
  // Arrange
  const db = await refreshTestingDatabase();
  const insertData = [
    { advice_id: 1, user_id: 2 },
  ];
  await Promise.all(insertData.map(async (adviceRecord) => {
    const { advice_id, user_id } = adviceRecord;
    const query = `INSERT INTO advice_records (advice_id, user_id) VALUES ('${advice_id}', '${user_id}')`;
    await db.run(query);
  }));
 
  const req = {
    params: {
      advice_id: insertData[0].advice_id,
      user_id: insertData[0].user_id
    }
  };
  const res = mockResponse();
  const next = jest.fn();
 
  // Act
  await getAdviceRecords(req, res, next);
  const responseData = res.send.mock.calls[0][0];
 
  // Assert
  expect(res.status).toHaveBeenCalledWith(200);
  expect(responseData.data[0].advice_id).toEqual(insertData[0].advice_id);
  expect(responseData.data[0].user_id).toEqual(insertData[0].user_id);
});
 
describe('create a advice record', () => {
  test('with id that is valid and all parameters available', async () => {
    // Arrange
    await refreshTestingDatabase();
 
    const req = {
      body: {
        advice_id: 1,
        user_id: 2
      }
    };
    const res = mockResponse();
    const next = jest.fn();
 
    // Act
    await createAdviceRecord(req, res, next);
    const responseData = res.send.mock.calls[0][0];
 
    // Assert
    expect(responseData.data.message).toEqual('records created successfully');
    expect(responseData.data[0].advice_id).toEqual(req.body.advice_id);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('with missing parameters', async () => {
    // Arrange
    await refreshTestingDatabase();
 
    const req = {
      body: {
        advice_id: 1,
        user_id: 2
      }
    };
    const res = mockResponse();
    const next = jest.fn();
 
    // Act
    await createAdviceRecord(req, res, next);
    const responseData = res.send.mock.calls[0][0];
    console.log(responseData);
 
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
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
