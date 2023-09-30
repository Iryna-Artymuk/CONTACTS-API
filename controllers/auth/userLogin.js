import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import asyncHandler from '../../decorators/acyncHandler.js';
import User from '../../models/users/Users.js';
import HttpError from '../../helpers/httpError.js';

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // первіряємо чи є користувач в базі
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `User with  emais ${email} not found `);
  }
  // якщо пошту не підтверджено викинути помилку
  if (!user.verify) throw HttpError(401, ' you have to verify your email');
  // compare DB password with pasword from frontend

  const comparePassword = await bcrypt.compare(password, user.password);
  console.log(' comparePassword', comparePassword);
  if (!comparePassword) {
    throw HttpError(401, 'email or passwor is incorrect ');
  }

  // if password valid create token
  // 1. creat payload
  //2. create Secret
  // 3. create token

  const payload = { id: user._id };
  const { JWT_SECRET_KEY } = process.env;
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '23h' });
  // update token in DB user:

  await User.findByIdAndUpdate(user._id, { token, subscription: 'starter' });

  // sent respond
  res.json({ token, email: user.email, subscription: 'starter' });
};
export default asyncHandler(userLogin);
