import express from 'express';
import cors from 'cors';
import {
    getMood,
    createMood,
    getMoodById,
    editMoodById,
    deleteMoodById
} from '../controllers/moodsController.js'
import {
    getMoodType,
    createMoodType,
    getMoodTypeById,
    editMoodTypeById,
    deleteMoodTypeById
} from '../controllers/moodTypesController.js'
import {
    getReason,
    createReason,
    getReasonById,
    editReasonById,
    deleteReasonById
} from '../controllers/reasonsController.js'
import {
    getRecord,
    createRecord,
    getRecordById,
    editRecordById,
    deleteRecordById
} from '../controllers/recordsController.js'
import {
    getThought,
    createThought,
    getThoughtById,
    getLatestThoughts,
    editThoughtById,
    deleteThoughtById
} from '../controllers/thoughtsController.js'
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('hi');
});

router.options('/moods', (req, res, next) => {
  try {
    //set header before response
    res.header({
      allow: 'GET, POST, DELETE, OPTIONS',
      'Content-type': 'mood/json',
      Data: Date.now(),
      'Content-length': 0,
    });
    //response
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

// get a collection of all the moods
router.get('/moods', cors(), getMood);
// route for creating a mood
router.post('/moods', cors(), createMood);
// route for getting a mood
router.get('/moods/:id', cors(), getMoodById);
// route for editing a mood
router.put('/moods/:id', cors(), editMoodById);
// route for deleteing a mood
router.delete('/moods/:id', cors(), deleteMoodById);

// get a collection of all the mood types
router.get('/mood-types', cors(), getMoodType);
// route for creating a mood type
router.post('/mood-types', cors(), createMoodType);
// route for getting a mood type
router.get('/mood-types/:id', cors(), getMoodTypeById);
// route for editing a mood type
router.put('/mood-types/:id', cors(), editMoodTypeById);
// route for deleteing a mood type
router.delete('/mood-types/:id', cors(), deleteMoodTypeById);

// get a collection of all the thoughts
router.get('/thoughts', cors(), getThought);
// get a collection of all the latest thoughts
router.get('/latest-thoughts', cors(), getLatestThoughts);
// route for creating a thought
router.post('/thoughts', cors(), createThought);
// route for getting a thought
router.get('/thoughts/:id', cors(), getThoughtById);
// route for editing a thought
router.put('/thoughts/:id', cors(), editThoughtById);
// route for deleteing a thought
router.delete('/thoughts/:id', cors(), deleteThoughtById);

// get a collection of all the reasons
router.get('/reasons', cors(), getReason);
// route for creating a reason
router.post('/reasons', cors(), createReason);
// route for getting a reason
router.get('/reasons/:id', cors(), getReasonById);
// route for editing a reason
router.put('/reasons/:id', cors(), editReasonById);
// route for deleteing a reason
router.delete('/reasons/:id', cors(), deleteReasonById);

// get a collection of all the records
router.get('/recordsMoods', cors(), getRecord);
// route for creating a record
router.post('/recordsMoods', cors(), createRecord);
// route for getting a record
router.get('/recordsMoods/:id', cors(), getRecordById);
// route for editing a record
router.put('/recordsMoods/:id', cors(), editRecordById);
// route for deleteing a record
router.delete('/recordsMoods/:id', cors(), deleteRecordById);
export default router;
