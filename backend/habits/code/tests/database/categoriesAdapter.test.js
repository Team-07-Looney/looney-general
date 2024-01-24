/* eslint-disable no-undef */
import { getAllCategoriesData} from '../../database/categoriesAdapter';
import { refreshTestingDatabase } from '../../database/database';

describe('getting all categories from the database', () => {
  test('successfully retrieve all categories in the database', async () => {
    // Arrange
    const db = await refreshTestingDatabase();

    const insertData = [
      { name: 'Morning Routine', userId: 1, iconId: '&#127765'},
      { name: 'Afternoon Routine', userId: 2, iconId: '&#127763'},
    ];

    await Promise.all(insertData.map(async (category) => {
      const { name, userId, iconId } = category;
      const query = `INSERT INTO categories (name, user_id, icon_id) VALUES ('${name}', '${userId}', '${iconId}')`;
      await db.run(query);
    }));

    // Act
    const categories = await getAllCategoriesData();

    // Assert
    expect(categories.length).toBe(insertData.length);
  });
});
