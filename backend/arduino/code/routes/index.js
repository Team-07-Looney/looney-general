import express from 'express';
import cors from 'cors';
const router = express.Router();

// routes
router.get('/', (req, res) => {
  res.json('hi from arduino');
});

router.options('/arduino', (req, res, next) => {
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
router.get('/test', cors(), (req, res) => {
  res.json("Data");
});

export default router;
