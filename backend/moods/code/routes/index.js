import express from 'express';
import cors from 'cors';
import {
  getMood,
  createMood,
  getMoodById,
  editMoodById,
  deleteMoodById
} from '../controllers/moodsController.js';
import {
  getMoodType,
  createMoodType,
  getMoodTypeById,
  editMoodTypeById,
  deleteMoodTypeById
} from '../controllers/moodTypesController.js';
import {
  getReason,
  createReason,
  getReasonById,
  editReasonById,
  deleteReasonById
} from '../controllers/reasonsController.js';
import {
  getRecord,
  createRecord,
  getRecordById,
  editRecordById,
  deleteRecordById
} from '../controllers/moodRecordsController.js';
import {
  getThought,
  createThought,
  getThoughtById,
  getLatestThoughts,
  editThoughtById,
  deleteThoughtById
} from '../controllers/thoughtsController.js';
import { getAdvice } from '../controllers/adviceController.js';
import { getAdviceGroups } from '../controllers/adviceGroupsController.js';
import {
  getAdviceRecords,
  createAdviceRecord
} from '../controllers/adviceRecordsController.js';
const router = express.Router();

// routes
router.get('/', (req, res) => {
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

// get a collection of all the mood records
router.get('/mood-records', cors(), getRecord);
// route for creating a mood record
router.post('/mood-records', cors(), createRecord);
// route for getting a mood record
router.get('/mood-records/:id', cors(), getRecordById);
// route for editing a mood record
router.put('/mood-records/:id', cors(), editRecordById);
// route for deleteing a mood record
router.delete('/mood-records/:id', cors(), deleteRecordById);

// get a collection of all the pieces of advice
router.get('/advice', cors(), getAdvice);

// get a collection of all the groups of advice
router.get('/advice-groups', cors(), getAdviceGroups);

// get a collection of all the advice records
router.get('/advice-records', cors(), getAdviceRecords);
// route for creating a advice record
router.post('/advice-records', cors(), createAdviceRecord);
export default router;
