import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';

import contactsRouter from './routes/api/contacts_router.js';
import authRouter from './routes/api/auth-router.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('public', 'images')));
// console.log(path.resolve('public', 'images'));
app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: ' Page not found' });
});

app.use((err, req, res, next) => {
  // деструктуризація з предачею дефолтних параметрів
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
