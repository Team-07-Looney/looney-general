import express from 'express';
import cors from 'cors';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import morgan from 'morgan';
import { requireAuth } from '../middleware/authMiddleware.js';
import { register, login, changePassword } from '../controllers/authController.js';

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

const moodProxy = createProxyMiddleware({
  target: 'http://msmoods:3013',
  changeOrigin: true,
  onProxyReq: fixRequestBody,
});

const arduinoProxy = createProxyMiddleware({
  target: 'http://msarduino:3014',
  changeOrigin: true,
  onProxyReq: fixRequestBody,
});

router.use('/categories', cors(), requireAuth, habitProxy);
router.use('/habit-records', cors(), requireAuth, habitProxy);
router.use('/predefined-habits', cors(), requireAuth, habitProxy);
router.use('/home', cors(), requireAuth);
router.use('/moods', cors(), requireAuth, moodProxy);
router.use('/mood-types', cors(), requireAuth, moodProxy);
router.use('/thoughts', cors(), requireAuth, moodProxy);
router.use('/latest-thoughts', cors(), requireAuth, moodProxy);
router.use('/reasons', cors(), requireAuth, moodProxy);
router.use('/mood-records', cors(), requireAuth, moodProxy);
router.use('/advice', cors(), requireAuth, moodProxy);
router.use('/advice-groups', cors(), requireAuth, moodProxy);
router.use('/advice-records', cors(), requireAuth, moodProxy);
router.use('/users', cors(), requireAuth, usersProxy);
router.use('/faces', arduinoProxy);

// Authentication routes
router.post('/register', cors(), register);
router.post('/login', cors(), login);
router.post('/profile/change-password', cors(), changePassword);

// Route to make sure user is authenticated
router.get('/verify', requireAuth, cors(), (req, res) => {
  res.status(200).send({'message': 'User is authenticated'});
});


export default router;
