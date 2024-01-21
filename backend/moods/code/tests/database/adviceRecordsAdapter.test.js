/* eslint-disable no-undef */
import { getAllAdviceRecordsData } from '../../database/adviceRecordsAdapter';
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
