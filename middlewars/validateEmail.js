import { HttpError } from '../helpers/index.js';
import Joi from 'joi'; // бібліотека валідації
//  ----Joi schema to check data from frontend
// it is must match mongoose schema

const emailRegExpr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const JoiValidateEmailSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegExpr).messages({
    'any.required': `frontend validation error check again  if you  added   email`,
  }),
});
const validateEmail= (req, res, next) => {
  const validateResult = JoiValidateEmailSchema .validate(req.body);
  // console.log('validateResult: ', validateResult);
  const { error } = validateResult;

  if (error) throw HttpError(400, error.message);
  // якщо не буде всіх даних  error === true спрацює HttpError(400, validateResult.messages) і код перерветься спрацює функція обробки помилок app.js
  //  error.message буде message з схеми валідації
  next();
};

export default  validateEmail;
