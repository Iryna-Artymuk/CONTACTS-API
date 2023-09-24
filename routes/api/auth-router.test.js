import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../app';
import connectDB from '../../config/connectDB.js';
import User from '../../models/users/Users.js';

// import User from '../../models/users/Users.js';

const { PORT } = process.env;
const DB_HOST_TEST =
  'mongodb+srv://Ira_Art:6PfXcX0yndb6EXh4@cluster0.mftd0fj.mongodb.net/my_contacts_test?retryWrites=true&w=majority';

//-----register test-------

// describe('test sigIn route', () => {
//   let server = null;
//   beforeAll(async () => {
//     connectDB(DB_HOST_TEST);
//     server = app.listen(PORT);
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//     server.close();
//   });

//   beforeEach(() => {});

//   afterEach(async () => {});

//   test('test register with correct data', async () => {
//     const signupData = {
//       name: 'Iryna',
//       email: 'iryna@ukr.net',
//       password: '123456',
//     };

//     const { statusCode, body } = await request(app)
//       .post('/api/auth/users/register')
//       .send(signupData);

//     console.log(' body : ', body);
//     expect(statusCode).toBe(201);
//     expect(body.email).toBe(signupData.email);
//     expect(body.name).toBe(signupData.name);
//   });
// });

//====login test

describe('test sigIn route', () => {
  let server = null;
  beforeAll(async () => {
    connectDB(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(() => {});

  test('test sigin with correct data', async () => {
    const signInData = {
      email: 'iryna@ukr.net',
      password: '123456',
    };

    const { statusCode, body } = await request(app)
      .post('/api/auth/users/login')
      .send(signInData);

    console.log(' body : ', body);

    expect(statusCode).toBe(200);
    expect(body.email).toBe(signInData.email);
    expect(typeof body.subscription).toBe('string');
    expect(typeof body.token).toBe('string');
  });
});
