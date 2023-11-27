import express from 'express';
import cors from 'cors';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import morgan from 'morgan';
import { requireAuth } from '../middleware/authMiddleware.js';
import { register, login, testFunc } from '../controllers/authController.js';

const router = express.Router();
router.use(cors({
  credentials: true,
  origin: true
}));
router.use(morgan());

// TODO: Create error handling
// create a proxy for each microservice
const habitProxy = createProxyMiddleware({
  target: 'http://mshabits:3010',
  changeOrigin: true,
  onProxyReq: fixRequestBody,
});

const usersProxy = createProxyMiddleware({
  target: 'http://msusers:3012',
  changeOrigin: true,
  onProxyReq: fixRequestBody,
});

router.use('/habits', cors(), requireAuth, habitProxy);
router.use('/users', cors(), requireAuth, usersProxy);

router.post('/register', cors(), register);
router.post('/login', cors(), login);

export default router;
