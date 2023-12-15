import express from 'express';
import cors from 'cors';
import { getUsers, getUser, createUser, updateUser } from '../controllers/userController.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('hi from users');
});

router.options('/users', (req, res, next) => {
  try {
    //set header before response
    res.header({
      allow: 'GET, POST, OPTIONS',
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
router.get('/users', cors(), getUsers);

router.post('/users', cors(), createUser);

router.get('/users/email/:userEmail', cors(), getUser);
router.get('/users/id/:userId', cors(), getUser);

router.post('/users/:userId', cors(), updateUser);

export default router;
