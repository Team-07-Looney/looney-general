import {
    getAllAdviceRecordsData
} from '../database/adviceRecordsAdapter.js'

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

 /**
   * get collection of all the advice records
   * @param {*} req request
   * @param {*} res response sent with all the advice records
   * @param {*} next 
   */
 export async function getAdviceRecords(req, res, next) {
    try {
      tempResponse.data = await getAllAdviceRecordsData();
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }
  }