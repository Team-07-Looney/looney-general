import express from 'express';
import cors from 'cors';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import morgan from 'morgan';

const router = express.Router();
router.use(cors());
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
});

router.use('/habits', cors(), habitProxy);
router.use('/users', cors(), usersProxy);

router.use('/register', cors(), (req, res, next) => {
  console.log(req.body);
});

export default router;
