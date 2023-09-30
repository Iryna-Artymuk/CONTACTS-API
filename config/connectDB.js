import { connect } from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

import colors from 'colors';

const configPath = path.resolve('./', 'config', '.env');
// console.log('configPath: ', configPath);
dotenv.config({ path: configPath }); // додає змінні з файлу env до глобального обєкту process.env



const connectDB = async DB_HOST => {


  try {
    const DB = await connect(DB_HOST);
    // console.log('DB : ', DB);

    console.log(
      `DB is connected. DB name: ${DB.connection.name}. Host: ${DB.connection.host}`
        .green.italic.underline.bold
    );
  } catch (error) {
    console.log(`${error.message}`);
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
