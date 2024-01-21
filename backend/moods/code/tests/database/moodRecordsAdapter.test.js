/* eslint-disable no-undef */
import { getAllRecordData} from '../../database/moodRecordsAdapter';
import { refreshTestingDatabase } from '../../database/database';


describe('getting all advice records from the database', () => {
  test('successfully retrieve all advice records in the database', async () => {
    // Arrange
    const db = await refreshTestingDatabase();

    const insertData = [
      { reason_id: 1, mood_id: 2, user_id: 4 },
      { reason_id: 2, mood_id: 4, user_id: 3 }
    ];

    await Promise.all(insertData.map(async (moodRecord) => {
      const { reason_id, mood_id, user_id } = moodRecord;
      // eslint-disable-next-line camelcase
      const query = `INSERT INTO mood_records (reason_id, mood_id, user_id) VALUES ('${reason_id}', '${mood_id}', '${user_id}')`;
      await db.run(query);
    }));

    // Act
    const moodRecords = await getAllRecordData();

    // Assert
    expect(moodRecords.length).toBe(insertData.length);
  });
});

