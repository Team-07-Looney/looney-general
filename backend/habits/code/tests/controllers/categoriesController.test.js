/* eslint-disable no-undef */
import { getCategories} from '../../controllers/categoriesController';
import { refreshTestingDatabase } from '../../database/database';

describe('get all categories', () => {
  test('from the database', async () => {
    // Arrange
    const db = await refreshTestingDatabase();
    const insertData = [{ name: 'Morning Routine', userId: 1, iconId: '&#127765'},
      { name: 'Afternoon Routine', userId: 2, iconId: '&#127763'}
    ];
    await Promise.all(insertData.map(async (category) => {
      const { name, userId, iconId } = category;
      const query = `INSERT INTO categories (name, user_id, icon_id) VALUES ('${name}', '${userId}', '${iconId}')`;
      await db.run(query);
    }));

    const req = {};
    const res = mockResponse();
    const next = jest.fn();

    // Act
    await getCategories(req, res, next);
    const responseData = res.send.mock.calls[0][0];

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(responseData.data.length).toEqual(2);
  });
});

// describe('get a category', () => {
//   test('that exists via their id', async () => {
//     // Arrange
//     const db = await refreshTestingDatabase();
//     const insertData = [
//       { name: 'Morning Routine', userId: 1, iconId: '&#127765'},
//     ];
//     await Promise.all(insertData.map(async (category) => {
//       const { name, userId, iconId } = category;
//       const query = `INSERT INTO categories (name, user_id, icon_id) VALUES ('${name}', '${userId}', '${iconId}')`;
//       await db.run(query);
//     }));

//     const req = {
//       params: {
//         id: 1
//       }
//     };
//     const res = mockResponse();
//     const next = jest.fn();

//     // Act
//     await getCategoryById(req, res, next);
//     const responseData = res.send.mock.calls[0][0];

//     // Assert
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(responseData.data.name).toEqual(insertData[0].name);
//     expect(responseData.data.userId).toEqual(insertData[0].userId);
//     expect(responseData.data.iconId).toEqual(insertData[0].iconId);
//   });

//   test('that does not exist will throw an error', async () => {
//     // Arrange
//     await refreshTestingDatabase();

//     const req = {
//       params: {
//         id: 2
//       }
//     };
//     const res = mockResponse();
//     const next = jest.fn();

//     // Act
//     await getCategoryById(req, res, next);
//     const responseData = res.send.mock.calls[0][0];

//     // Assert
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(responseData.data).toEqual('No category found with such key');
//   });
// });

// describe('create a category', () => {
//   test('Successful creation of category', async () => {
//     // Arrange
//     await refreshTestingDatabase();

//     const req = {
//       body: {
//         name: 'Morning Routine',
//         userId: 2,
//         iconId: '&#127765'
//       }
//     };
//     const res = mockResponse();
//     const next = jest.fn();

//     // Act
//     await createCategory(req, res, next);
//     const responseData = res.send.mock.calls[0][0];

//     // Assert
//     expect(responseData.data.message).toEqual('Successfully added category');
//     expect(responseData.data.name).toEqual(req.body.name);
//     expect(res.status).toHaveBeenCalledWith(200);
//   });


//   test('with missing parameters', async () => {
//     // Arrange
//     await refreshTestingDatabase();

//     const req = {
//       body: {
//         name: 'Morning Routine',
//         userId: 2,
//       }
//     };
//     const res = mockResponse();
//     const next = jest.fn();

//     // Act
//     await createCategory(req, res, next);
//     const responseData = res.send.mock.calls[0][0];
//     console.log(responseData);

//     // Assert
//     expect(res.status).toHaveBeenCalledWith(409);
//   });
// });

// describe('update a category', () => {
//   test('Edit a category', async () => {
//     // Arrange
//     const db = await refreshTestingDatabase();
//     const insertData = [
//       { name: 'Morning Routine', userId: 1, iconId: '&#127765'},
//     ];
//     await Promise.all(insertData.map(async (category) => {
//       const { name, userId, iconId } = category;
//       const query = `INSERT INTO categories (name, user_id, icon_id) VALUES ('${name}', '${userId}', '${iconId}')`;
//       await db.run(query);
//     }));

//     const req = {
//       params: {
//         userId: 1
//       },
//       body: {
//         key: 'name',
//         value: 'Morning Routine'
//       }
//     };
//     const res = mockResponse();
//     const next = jest.fn();

//     // Act
//     await editCategoryById(req, res, next);
//     const responseData = res.send.mock.calls[0][0];

//     // Assert
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(responseData.data.message).toEqual('Successfully updated the categories\'s password');
//     expect(responseData.data.userId).toEqual(req.params.userId);
//   });
// });

// /**
//  * Creates a mock response for the controller
//  * @returns the mock response
//  */
function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}
