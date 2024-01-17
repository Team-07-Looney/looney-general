import express from 'express';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config({ path: 'variables.env' });

import indexRouter from './routes/index.js';
import cors from 'cors';

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: true
}));

app.use('/', indexRouter);

// eslint-disable-next-line no-undef
app.set('port', process.env.PORT || 3011);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
