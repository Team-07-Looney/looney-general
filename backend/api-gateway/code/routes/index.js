import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

// create a proxy for each microservice
const habitProxy = createProxyMiddleware({
  target: 'http://mshabits:3010',
  changeOrigin: true,
});

router.use('/habits', cors(), habitProxy);

export default router;
