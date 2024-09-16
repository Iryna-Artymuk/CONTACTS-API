import fs from 'fs';
import path from 'path';

import handlebars from 'handlebars';
import HttpError from '../../helpers/httpError.js';
import asyncHandler from '../../decorators/acyncHandler.js';
import sendEmail from '../../helpers/sendEmail.js';
import User from '../../models/users/Users.js';

const { BASE_URL } = process.env;

const resendVerifyUserEmail = async (req, res) => {
  const { email } = req.body;

  // превіряєм чи користуває є в БД
  const user = await User.findOne({ email });
  console.log(' user: ',  user);

  if (!user) {
    throw HttpError(404, ` user with email ${email} not found `);
  }
  // превіряєм чи користуває ще не підтвердив свій email
  if (user.verify) {
    throw HttpError(404, `  email ${email}  already verify`);
  }

  const emailTemplatePath = path.resolve('templates', 'verifycationEmail.html');
  const source = fs.readFileSync(emailTemplatePath, 'utf-8').toString();
  //Compile the template data into a function
  const template = handlebars.compile(source);
  const replacements = {
    username: user.name,
    verificationLink: `${BASE_URL}/api/auth/users/verify/${user.verificationCode}`,
  };
  // add context to dynamic variables
  const htmlToSend = template(replacements);

  const dataToSend = {
    to: email, // list of receivers
    subject: 'verify your email ', // Subject line
    text: ' Plese verify your email', // plain text body
    html: htmlToSend,
  };
  sendEmail(dataToSend);
  res.status(200).json({
    messege: 'email verification link resend ',
  });
};

export default asyncHandler(resendVerifyUserEmail);
