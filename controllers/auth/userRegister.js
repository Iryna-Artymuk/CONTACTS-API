import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';

import { HttpError, sendEmail } from '../../helpers/index.js';
import asyncHandler from '../../decorators/acyncHandler.js';
import User from '../../models/users/Users.js';

const { BASE_URL } = process.env;
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
  const gravatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  // -------------CREAT NEW USER-----------
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: gravatarURL,
    verificationCode,
  });

  // ------------CREAT EMAIL FROM TEMPLATE----------------

  const emailTemplatePath1 = path.resolve(
    'templates',
    'verifycationEmail.html'
  );
  const source1 = fs.readFileSync(emailTemplatePath1, 'utf-8').toString();
  //Compile the template data into a function
  const template1 = handlebars.compile(source1);
  const replacements1 = {
    username: newUser.name,
    verificationLink: `${BASE_URL}/api/auth/users/verify/${verificationCode}`,
  };
  // add context to dynamic variables
  const htmlToSend1 = template1(replacements1);

  const dataToSend1 = {
    to: newUser.email, // list of receivers
    subject: 'verify your email ', // Subject line
    text: ' Plese verify your email', // plain text body
    html: htmlToSend1,
  };

  const emailTemplatePath2 = path.resolve(
    'templates',
    'stopWarStripoEmail.html'
  );
  const source2 = fs.readFileSync(emailTemplatePath2, 'utf-8').toString();
  //Compile the template data into a function
  const template2 = handlebars.compile(source2);
  const replacements2 = {
    username: newUser.name,
  };
  // add context to dynamic variables
  const htmlToSend2 = template2(replacements2);

  const dataToSend2 = {
    to: newUser.email, // list of receivers
    subject: 'Stop War', // Subject line
    text: ' Stop War', // plain text body
    html: htmlToSend2,
  };
  sendEmail(dataToSend1);
  sendEmail(dataToSend2);
  // send response to frontend
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatarURL: newUser.avatarURL,
  });
};

export default asyncHandler(userRegister);
