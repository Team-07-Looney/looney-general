/* eslint-disable no-undef */
import { createAdviceRecordInstance, getAllAdviceRecordsData } from '../../database/adviceRecordsAdapter';
import { refreshTestingDatabase } from '../../database/database';

describe('getting all advice records from the database', () => {
  test('successfully retrieve all advice records in the database', async () => {
    // Arrange
    const db = await refreshTestingDatabase();

    const insertData = [
      { advice_id: 1, user_id: 2},
      { advice_id: 2, user_id: 3}
    ];

    await Promise.all(insertData.map(async (adviceRecord) => {
      const { adviceId, userId } = adviceRecord;
      const query = `INSERT INTO advice_records (advice_id, user_id) VALUES ('${adviceId}', '${userId}')`;
      await db.run(query);
    }));

    // Act
    const adiveRecords = await getAllAdviceRecordsData();

    // Assert
    expect(adiveRecords.length).toBe(insertData.length);
  });
});

// describe('adding new advice records to the database', () => {
//   test('successfully adding a new advice record to the database', async () => {
//     // Arrange
//     await refreshTestingDatabase();
//     const adviceRecordData = { advice_id: 1, user_id: 2};

//     // Act
//     const response = await createAdviceRecordInstance({
//       advice_id: adviceRecordData[0].advice_id,
//       user_id: adviceRecordData[0].user_id
//     });
    

//     // Assert
//     expect(response).toEqual({
//       code: 200,
//       message: 'Successfully added advice record'
//     });
//   });
// });

