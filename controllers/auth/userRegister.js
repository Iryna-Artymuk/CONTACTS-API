import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';

import { HttpError } from '../../helpers/index.js';
import asyncHandler from '../../decorators/acyncHandler.js';
import User from '../../models/users/Users.js';

const userRegister = async (req, res) => {
  // check if user already exist
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // if user true throw error if not make request to create user

  if (user) {
    throw HttpError(409, ` user with email ${email} already exist`.red);
  }
  // hash confidentin data
  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(password, salt);
  console.log('hashPassword : ', hashPassword);

  const gravatarURL = gravatar.url(email);
  // make req to DB to creat new user
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatarURL: gravatarURL,
  });
};

export default asyncHandler(userRegister);
