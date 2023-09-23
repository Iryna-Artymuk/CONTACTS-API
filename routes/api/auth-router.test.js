import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../app.js';

// import User from '../../models/users/Users.js';

const { DB_HOST_TEST, PORT } = process.env;

describe('test sigIn route', () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
    const signupData = {
      username: 'Iryna',
      email: 'iryna@ukr.net',
      password: '123456',
    };
    await request(app).post('/users/register').send(signupData);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(() => {});

  afterEach(async () => {});

  test('test sigin with correct data', async () => {
    const signInData = {
      email: 'iryna@ukr.net',
      password: '123456',
    };
    const { statusCode, body } = await request(app)
      .post('/users/login')
      .send(signInData);
    expect(statusCode).toBe(200);
    expect(body.email).toBe(signInData.email);
    expect(body.subscription).toEqual('string');
    expect(body.token).toEqual('string');
  });
});
