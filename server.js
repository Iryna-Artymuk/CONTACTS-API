import app from './app.js';

import dotenv from 'dotenv';

import path from 'path';
import connectDB from './config/connectDB.js';
const { PORT } = process.env;


// console.log('PORT : ', PORT);

await connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bold.green);
});
