import { openDatabaseConnection, closeDatabaseConnection } from './database.js';

/**
 * executes SQL query that retrieves all the categories from categories table
 * @returns categories data from the database
 */
export async function getAllCategoriesData() {
    return new Promise(async (resolve, reject) => {
      const db = await openDatabaseConnection();
      const sql = "SELECT * FROM categories";
      const params = [];
      db.all(sql, params, (err, rows) => {
        closeDatabaseConnection(db);
  
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * executes SQL query that inserts values from the request into categories table
   * @param {*} request request body with the data for a new category
   * @returns 
   */
  export async function createCategoryInstance(request) {
    return new Promise(async (resolve, reject) => {
      const db = await openDatabaseConnection();
      const insert = 'INSERT INTO categories (name, user_id) VALUES (?,?)';
  
      db.run(insert, [request.name, request.user_id], (err) => {
        closeDatabaseConnection(db);
  
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  /**
   * executes SQL query that retrieves category data based on specified id
   * @param {*} id id of a category that needs to be retrieved
   * @returns category data
   */
  export async function getCategoryInstanceById(id) {
    return new Promise(async (resolve, reject) => {
      const db = await openDatabaseConnection();
      const sql = `SELECT * FROM categories WHERE id='${id}'`;
  
      db.all(sql, (err, row) => {
        closeDatabaseConnection(db);
  
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  
  /**
   * executes SQL query that looks for category with specified id in table categories and updates its values
   * @param {*} category new data of a category
   * @param {*} categoryId id of a category that needs to be updated
   * @returns 
   */
  export async function editCategoryInstanceById(category, categoryId) {
    return new Promise(async (resolve, reject) => {
      const db = await openDatabaseConnection();
      const update = `UPDATE categories SET name='${category.name}' WHERE id=${categoryId}`;
      
      db.run(update, (err) => {
        closeDatabaseConnection(db);
  
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  /**
   * executes SQL query that looks for category with specified id and deletes it from categories table
   * @param {*} categoryId id of a category that needs to be deleted
   * @returns 
   */
  export async function deleteCategoryInstanceById(categoryId) {
    return new Promise(async (resolve, reject) => {
      const db = await openDatabaseConnection();
      const categoryQuery = `DELETE FROM categories WHERE id='${categoryId}'`;
      const habitQuery = `DELETE FROM habits WHERE category_id='${categoryId}'`;
      
      db.run(categoryQuery, (err) => {
        closeDatabaseConnection(db);
  
        if (err) {
          console.error(err);
          reject(err);
        } else {
          db.run(habitQuery, (err) => {
            closeDatabaseConnection(db);

            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve();
            }
          })
        }
      });
    });
  }