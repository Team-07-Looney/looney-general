/* eslint-disable no-undef */
import { getAllCategoriesData } from '../../database/categoriesAdapter';
import { refreshTestingDatabase } from '../../database/database';

describe('getting all categories from the database', () => {
  test('successfully retrieve all categories in the database', async () => {
    // Arrange
    let db = await refreshTestingDatabase();

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

// describe('adding new categories to the database', () => {
//   test('successfully adding a new category to the database', async () => {
//     // Arrange
//     await refreshTestingDatabase();
//     const categoryData = { name: 'Anytime Routine', userId: 1, iconId: '&#127765'};

//     // Act
//     const response = await createCategoryInstance(categoryData.name,
//       categoryData.userId, categoryData.iconId);

//     // Assert
//     expect(response).toEqual({
//       code: 200,
//       message: 'Successfully added category',
//       name: categoryData.name
//     });
//   });
// });

// describe('getting a category from the database', () => {
//   test('selecting the category by id from the database if they exist', async () => {
//     // Arrange
//     const db = await refreshTestingDatabase();
//     const categoryData = { name: 'Anytime Routine', userId: 1, iconId: '&#127765'};
//     const query = `INSERT INTO categories (name, user_id, icon_id) VALUES ("${categoryData.name}", "${categoryData.userId}", "${categoryData.iconId}")`;
//     await db.run(query);

//     // Act 
//     const response = await getCategoryInstanceById('id', 1);

//     // Assert
//     expect(response).toEqual({
//       id: 1,
//       name: categoryData.name,
//       user_id: categoryData.userId,
//       icon_id: categoryData.iconId
//     });
//   });
// });

