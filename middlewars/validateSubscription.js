import { HttpError } from '../helpers/index.js';
import Joi from 'joi'; // бібліотека валідації

const JoiSubscriptioneSchema = Joi.string()
  .valid('starter', 'pro', 'business')
  .required()
  .messages({
    'any.required': 'missing field subscription',
    'any.only': `validation error should be a one  of  starte, pro, business `,
  });

const vadidateSubscription = (req, _, next) => {
  console.log('vadidateSubscription');
  const { subscription } = req.query;

  const validateResult = JoiSubscriptioneSchema.validate(subscription);
  // console.log('validateResult: ', validateResult);
  // console.log('validateResult: ', validateResult);
  const { error } = validateResult;

  if (error) throw HttpError(400, error.message);

  next();
};

export default vadidateSubscription;
