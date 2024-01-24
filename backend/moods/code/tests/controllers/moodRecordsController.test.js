/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { getRecord, createRecord } from '../../controllers/moodRecordsController';
import { refreshTestingDatabase } from '../../database/database';
 
describe('get all mood records', () => {
  test('from the database', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const insertData = [
      { reason_id: 1, mood_id: 2, user_id: 4 },
      { reason_id: 2, mood_id: 4, user_id: 3 }
    ];
    await Promise.all(insertData.map(async (moodRecord) => {
      const { reason_id, mood_id, user_id } = moodRecord;
      const query = `INSERT INTO mood_records (reason_id, mood_id, user_id) VALUES ('${reason_id}', '${mood_id}', '${user_id}')`;
      await db.run(query);
    }));
 
    const req = {};
    const res = mockResponse();
    const next = jest.fn();
 
    // Act
    await getRecord(req, res, next);
    const responseData = res.send.mock.calls[0][0];
 
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(responseData.data.length).toEqual(2);
  });
});
 
describe('get a mood record', () => {
  test('that exists via their id', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const insertData = [
      { reason_id: 1, mood_id: 2, user_id: 4 }
    ];
    await Promise.all(insertData.map(async (moodRecord) => {
      const { reason_id, mood_id, user_id } = moodRecord;
      const query = `INSERT INTO mood_records (reason_id, mood_id, user_id) VALUES ('${reason_id}', '${mood_id}', '${user_id}')`;
      await db.run(query);
    }));
 
    const req = {
      params: {
        id: insertData[0].mood_id
      }
    };
    const res = mockResponse();
    const next = jest.fn();
 
    // Act
    await getRecord(req, res, next);
    const responseData = res.send.mock.calls[0][0];
 
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(responseData.data[0].mood_id).toEqual(`/moods/${insertData[0].mood_id}`);
  });
});
 
test('that exists via their id', async () => {
  // Arrange
  const db = await refreshTestingDatabase();
  const insertData = [
    { reason_id: 1, mood_id: 2, user_id: 4 }
  ];
  await Promise.all(insertData.map(async (moodRecord) => {
    const { reason_id, mood_id, user_id } = moodRecord;
    const query = `INSERT INTO mood_records (reason_id, mood_id, user_id) VALUES ('${reason_id}', '${mood_id}', '${user_id}')`;
    await db.run(query);
  }));
 
  const req = {
    params: {
      reason_id: insertData[0].reason_id,
      mood_id: insertData[0].mood_id,
      user_id: insertData[0].user_id
    }
  };
  const res = mockResponse();
  const next = jest.fn();
 
  // Act
  await getRecord(req, res, next);
  const responseData = res.send.mock.calls[0][0];
 
  // Assert
  expect(res.status).toHaveBeenCalledWith(200);
  expect(responseData.data[0].mood_id).toEqual(`/moods/${insertData[0].mood_id}`);
  expect(responseData.data[0].user_id).toEqual(insertData[0].user_id);
});

describe('create a mood record', () => {
  test('with id that is valid and all parameters available', async () => {
    // Arrange
    await refreshTestingDatabase();
 
    const req = {
      body: {
        reason_id: 2,
        mood_id: 2,
        user_id: 2
      }
    };
    const res = mockResponse();
    const next = jest.fn();
 
    // Act
    await createRecord(req, res, next);
    const responseData = res.send.mock.calls[0][0];
 
    // Assert
    expect(responseData.data.message).toEqual('records created successfully');
    expect(responseData.data[0].mood_id).toEqual(`/moods/${req.body.mood_id}`);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('with missing parameters', async () => {
    // Arrange
    await refreshTestingDatabase();
 
    const req = {
      body: {
        reason_id: 2,
        mood_id: 1,
        user_id: 2
      }
    };
    const res = mockResponse();
    const next = jest.fn();
 
    // Act
    await createRecord(req, res, next);
 
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
