import jwt from 'jsonwebtoken';

import asyncHandler from '../decorators/acyncHandler.js';
import User from '../models/users/Users.js';
import HttpError from '../helpers/httpError.js';

const authentication = async (req, res, next) => {
  // get token from fromtend in header
  const { authorization = '' } = req.headers;
  //   console.log('authorization : ', authorization);

  const [bearer, token] = authorization?.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401));
  }

  // verify token
  const { JWT_SECRET_KEY } = process.env;
  const payload = jwt.verify(token, JWT_SECRET_KEY);
  // find user in DB

  const { id } = payload;

  if (!id) {
    return next(HttpError(401, `user with ID: ${id} not found in DB`));
  }

  const currenttUser = await User.findById(id);

  if (!currenttUser || !token) {
    return next(HttpError(401, 'Not authorized'));
  }
  // add existuser to  request object

  req.user = currenttUser;

  next();
};

export default asyncHandler(authentication);
