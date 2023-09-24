import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../app';

// import User from '../../models/users/Users.js';

const { PORT } = process.env;
const DB_HOST_TEST =
  'mongodb+srv://Ira_Art:6PfXcX0yndb6EXh4@cluster0.mftd0fj.mongodb.net/my_contacts_test?retryWrites=true&w=majority';
describe('test sigIn route', () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server = app.listen(PORT);

    const signupData = {
      username: 'Iryna',
      email: 'iryna@ukr.net',
      password: '123456',
    };
    await request(app).post('/api/auth/users/register').send(signupData);
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
      .post('/api/auth/users/login')
      .send(signInData);
    expect(statusCode).toBe(200);
    expect(body.email).toBe(signInData.email);
    expect(body.subscription).toEqual('string');
    expect(body.token).toEqual('string');
  });
});
