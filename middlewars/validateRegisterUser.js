import { HttpError } from '../helpers/index.js';
import Joi from 'joi'; // бібліотека валідації
//  ----Joi schema to check data from frontend
// it is must match mongoose schema

const emailRegExpr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const JoiRegisterUserSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    'any.required': ` frontend validation error check again  if you  added    name `,
  }),
  email: Joi.string().required().pattern(emailRegExpr).messages({
    'any.required': `frontend validation error check again  if you  added   email`,
  }),
  password: Joi.string().required().min(6).messages({
    'string.min':
      'Frontend validation error  password should be min 6 characters..',
    'any.required': `Frontend validation error check again  if you  added   password`,
  }),
  subscription: Joi.string().valid('starter', 'pro', 'business').messages({
    'any.only': ` frontend validation error should be a one  of  starter, pro, business) `,
  }),
});
const validateRegisterUser = (req, res, next) => {
  const validateResult = JoiRegisterUserSchema.validate(req.body);
  // console.log('validateResult: ', validateResult);
  const { error } = validateResult;

  if (error) throw HttpError(400, error.message);
  // якщо не буде всіх даних  error === true спрацює HttpError(400, validateResult.messages) і код перерветься спрацює функція обробки помилок
  //  error.message буде message з схеми валідації
  next();
};

export default validateRegisterUser;
