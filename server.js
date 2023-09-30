import app from './app.js';


import connectDB from './config/connectDB.js';
const { PORT , DB_HOST} = process.env;

// console.log('PORT : ', PORT);

await connectDB(DB_HOST);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bold.green);
});
