import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../app';
import connectDB from '../../config/connectDB.js';
import User from '../../models/users/Users.js';

// import User from '../../models/users/Users.js';

const { PORT, DB_HOST_TEST } = process.env;

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
  // test('test sigin with incorrect data', async () => {
  //   const signInData = {
  //     email: 'iryna_2@ukr.net',
  //     password: '123456',
  //   };

  //  const user =  await User.findOne({ email: signInData.email });
  //   console.log('user : ', user);
  // expect( () =>  User.findOne({ email: signInData.email })).toThrow(`User with  emais ${signInData.email} not found `)
  // });
});
