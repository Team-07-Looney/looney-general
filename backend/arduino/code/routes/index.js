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

// get a collection of all the faces
/**
 * Whenever you want to add a new face just add a new route with the face description and
 * the array with three hexdecimal numbers
 */

router.get('/faces/wink', cors(), (req, res) => {
  res.json(['0x2a011', '0x100101', '0x10020000']);
});

router.get('/faces/smile', cors(), (req, res) => {
  res.json(['0x4008', '0x80800800', '0x88040000']);
});

router.get('/faces/sad', cors(), (req, res) => {
  res.json(['0x8204', '0x90400400', '0x49082000']);
});

router.get('/faces/laugh', cors(), (req, res) => {
  res.json(['0x100c81d', '0x1c01c01', '0xd00c8010']);
});

router.get('/faces/neutral', cors(), (req, res) => {
  res.json(['0x4004', '0x80400400', '0x48040000']);
});

router.get('/faces/grumpy', cors(), (req, res) => {
  res.json(['0x20214', '0x40040041', '0x44202000']);
});

export default router;
