import {
  getAllAdviceGroupsData
} from '../database/adviceGroupsAdapter.js';

/**
 * function that calculates today's date
 * @returns today's date
 */
function getToDay() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  const currentDate = `${day}-${month}-${year}`;
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

/**
 * get collection of all the advice groups
 * @param {*} req request
 * @param {*} res response sent with all the advice groups
 * @param {*} next next function for error handling middleware
 */
export async function getAdviceGroups(req, res, next) {
  try {
    tempResponse.data = await getAllAdviceGroupsData();
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}
