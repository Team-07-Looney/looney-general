import { createPredefinedCategoryInstances, getAllPredefinedCategoriesData } from '../database/predefinedCategoriesAdapter.js';

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

export async function getPredefinedCategories(req, res, next) {
    try {
      tempResponse.data = await getAllPredefinedCategoriesData();
      res.status(200).send(tempResponse);
    } catch (err) {
      next(err);
    }

  }

export async function createPredefinedCategories(req, res, next) {
    try {
        // Retrieve predefined categories data
        const predefinedCategoriesData = await getAllPredefinedCategoriesData();

        // Create predefined category instances for all categories
        console.log(req.body.user_id)
        await createPredefinedCategoryInstances(predefinedCategoriesData, req.body.user_id);

        tempResponse.data.message = "Predefined category instances created successfully";
        res.status(200).send(tempResponse);
    } catch (err) {
        next(err);
    }
}


//   export async function createPredefinedCategories(req, res, next) {
//     try {
//         tempResponse.data = await getAllPredefinedCategoriesData();
//       await data.forEach(element => {
//         createPredefinedCategoryInstance(.body);
//       });
//       tempResponse.data.message = "Predefined category created successfully";
//       res.status(200).send(tempResponse);
//     } catch (err) {
//       next(err);
//     }
//   }

// import { createPredefinedCategoryInstances, getAllPredefinedCategoriesData } from '../database/predefinedCategoriesAdapter.js';

// export async function createPredefinedCategories(req, res, next) {
//     try {
//         // Retrieve predefined categories data
//         const predefinedCategoriesData = await getAllPredefinedCategoriesData();

//         // Create predefined category instances
//         await createPredefinedCategoryInstances(predefinedCategoriesData);

//         tempResponse.data.message = "Predefined category instances created successfully";
//         res.status(200).send(tempResponse);
//     } catch (err) {
//         next(err);
//     }
// }