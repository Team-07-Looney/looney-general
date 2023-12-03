import express from 'express';
import cors from 'cors';
import {
  createHabit,
  getHabits,
  getHabitById,
  editHabitById,
  deleteHabitById
} from '../controllers/habitsController.js';
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

// get a collection of all the habits
router.get('/habits', cors(), getHabits);

// route for creating a habit
router.post('/habits', cors(), createHabit);

// route for getting a habit
router.get('/habits/:id', cors(), getHabitById);

// route for editing a habit
router.put('/habits/:id', cors(), editHabitById);

// route for deleteing a habit
router.delete('/habits/:id', cors(), deleteHabitById);

export default router;
