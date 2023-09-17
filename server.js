import app from './app.js';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config(); // додає змінні з файлу env до глобального обєкту process.env
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(4000, () =>
      console.log('Server running sucsesfully connect to DB  my_contacts')
    )
  )
  .catch(error => {
    console.log('can not connect to DB ');
    process.exit(1); // глобальний обєкт який закриває всі запущені процеси
  });
