import {
    getAllCategoriesData,
    createCategoryInstance,
    getCategoryInstanceById,
    editCategoryInstanceById,
    deleteCategoryInstanceById

} from '../database/categoriesAdapter.js';

/**
 * function that calculates today's date
 * @returns today's date
 */
function getToDay() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    console.log(currentDate);
    return currentDate;
  }
  
const tempResponse = {
    meta: {
      date: getToDay(),
    },
    data: {
      message: 'this route is not implemented yet',
    },
  };

export async function getCategories(req, res, next) {
    try {
      tempResponse.data = await getAllCategoriesData();
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }

  /**
 * create a category
 * @param {*} req request with the data for a new category
 * @param {*} res response sent with the result message
 * @param {*} next 
 */
export async function createCategory(req, res, next) {
  try {
    await createCategoryInstance(req.body);
    tempResponse.data.message = "category created successfully";
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

/**
 * get category data by specified id
 * @param {*} req request with category id
 * @param {*} res response sent with category data
 * @param {*} next 
 */
export async function getCategoryById(req, res, next) {
  try {
    tempResponse.data = await getCategoryInstanceById(req.params.categoryId);
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}

/**
 * edit category data by specified id
 * @param {*} req request with category id
 * @param {*} res response sent with a result message
 * @param {*} next 
 */
export async function editCategoryById(req, res, next) {
  try {
    await editCategoryInstanceById(req.body, req.params.categoryId);
    tempResponse.data.message = "category edited successfully";
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}

/**
 * delete category by specified id
 * @param {*} req request with category id
 * @param {*} res 
 * @param {*} next 
 */
export async function deleteCategoryById(req, res, next) {
  try {
    await deleteCategoryInstanceById(req.params.categoryId);
    tempResponse.data.message = "category deleted successfully";
    res.status(200).send(tempResponse);
  } catch(err) {
    next(err);
  }
}
