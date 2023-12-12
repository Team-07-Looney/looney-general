import express from 'express';
import cors from 'cors';
import {
  createHabit,
  getHabits,
  getHabitById,
  editHabitById,
  deleteHabitById
} from '../controllers/habitsController.js';
import {
  createCategory,
  deleteCategoryById,
  editCategoryById,
  getCategories,
  getCategoryById
} from '../controllers/categoriesController.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('hi');
});

router.options('/habits', (req, res, next) => {
  try {
    //set header before response
    res.header({
      allow: 'GET, POST, DELETE, OPTIONS',
      'Content-type': 'habit/json',
      Data: Date.now(),
      'Content-length': 0,
    });
    //response
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.options('/categories', (req, res, next) => {
  try {
    //set header before response
    res.header({
      allow: 'GET, POST, DELETE, OPTIONS',
      'Content-type': 'habit/json',
      Data: Date.now(),
      'Content-length': 0,
    });
    //response
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});




// // get a collection of all the habits
// router.get('/habits', cors(), getCategories);

// // route for creating a habit
// router.post('/habits', cors(), createCategory);

// // route for getting a habit
// router.get('/habits/:id', cors(), getCategoryById);

// // route for editing a habit
// router.put('/habits/:id', cors(), editCategoryById);

// // route for deleteing a habit
// router.delete('/habits/:id', cors(), deleteCategoryById);

// get a collection of all the habits
router.get('/categories', cors(), getCategories);

// route for creating a habit
router.post('/categories', cors(), createCategory);

// route for getting a habit
router.get('/categories/:categoryId', cors(), getCategoryById);

// route for editing a habit
router.put('/categories/:categoryId', cors(), editCategoryById);

// route for deleteing a habit
router.delete('/categories/:categoryId', cors(), deleteCategoryById);

router.get('/categories/:categoryId/habits', cors(), getHabits);
router.post('/categories/:categoryId/habits', cors(), createHabit);
router.get('/categories/:categoryId/habits/:habitId', cors(), getHabitById);
router.put('/categories/:categoryId/habits/:habitId', cors(), editHabitById);
router.delete('/categories/:categoryId/habits/:habitId', cors(), deleteHabitById);

export default router;
