import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import indexRouter from './routes/index.js';

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use((req, res, next) => {
  try {
    //set header before response
    res.status(404).send("Sorry can't find that!");
  } catch (err) {
    next(err);
  }
});

app.set('port', process.env.PORT || 3013);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
