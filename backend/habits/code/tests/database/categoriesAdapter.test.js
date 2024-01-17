/* eslint-disable no-undef */
import { getAllCategoriesData, createCategoryInstance, getCategoryInstanceById, editCategoryInstanceById, deleteCategoryInstanceById } from '../../database/adapter';
import { openDatabaseConnection, closeDatabaseConnection, refreshTestingDatabase } from '../../database/database';

describe('getting all categories from the database', () => {
  test('successfully retrieve all categories in the database', async () => {
    // Arrange
    let db = await refreshTestingDatabase();

    const insertData = [
      { name: 'Morning Routine', user_id: '1' },
      { name: 'Afternoon Routine', user_id: '2' },
    ];

    await Promise.all(insertData.map(async (category) => {
      const { name, userId } = category;
      const query = `INSERT INTO categories (name, user_id) VALUES ('${name}', '${userId}')`;
      await db.run(query);
    }));

    // Act
    const categories = await getAllCategoriesData();

    // Assert
    expect(categories.length).toBe(insertData.length);
  });
});

describe('adding new categories to the database', () => {
  test('successfully adding a new category to the database', async () => {
    // Arrange
    await refreshTestingDatabase();
    const categoryData = { name: 'Anytime Routine', userId: '1' };

    // Act
    const response = await createCategoryInstance(categoryData.name, categoryData.userId);

    // Assert
    expect(response).toEqual({
      code: 200,
      message: 'Successfully added category',
      name: categoryData.name
    });
  });
});

describe('getting categories from the database', () => {
  test('selecting the category by id from the database if they exist', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const userData = { username: 'John Doe', email: 'john@looney.nl'};
    const query = `INSERT INTO users (username, email, password) VALUES ("${userData.username}", "${userData.email}")`;
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

