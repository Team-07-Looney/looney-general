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
import { createHabitRecord, getHabitRecordById, getHabitRecords } from '../controllers/habitRecordsController.js';
import { createPredefinedCategories } from '../controllers/predefinedCategoriesController.js';

const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('hi');
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

// get a collection of all the categories
router.get('/categories', cors(), getCategories);

// route for creating a category
router.post('/categories', cors(), createCategory);

// route for getting a category
router.get('/categories/:categoryId', cors(), getCategoryById);

// route for editing a category
router.put('/categories/:categoryId', cors(), editCategoryById);

// route for deleteing a category
router.delete('/categories/:categoryId', cors(), deleteCategoryById);


// get a collection of all the habits
router.get('/categories/:categoryId/habits', cors(), getHabits);

// route for creating a habit
router.post('/categories/:categoryId/habits', cors(), createHabit);

// route for getting a habit
router.get('/categories/:categoryId/habits/:habitId', cors(), getHabitById);

// route for editing a category
router.put('/categories/:categoryId/habits/:habitId', cors(), editHabitById);

// route for deleting a category
router.delete('/categories/:categoryId/habits/:habitId', cors(), deleteHabitById);

// get a collection of all the records
router.get('/habit-records', cors(), getHabitRecords);

// route for creating a record
router.post('/habit-records', cors(), createHabitRecord);

// route for getting a record
router.get('/habit-records/:id', cors(), getHabitRecordById);

// route for creating predefined categories
router.post('/predefined-categories', cors(), createPredefinedCategories);

export default router;
