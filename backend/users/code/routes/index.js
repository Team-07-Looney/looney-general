import express from 'express';
import cors from 'cors';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('hi from users');
});

export default router;
