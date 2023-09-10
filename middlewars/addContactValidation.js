import Joi from 'joi'; // бібліотека валідації

import { HttpError } from '../helpers/index.js';

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': `frontend validation error check again  if you  add name`,
  }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
    .required()
    .messages({
      'any.only': ` frontend validation error domen  should be a one  of  'com', 'net', 'org') `,
      'any.required': `frontend validation error check again  if you  add email`,
    }),

  phone: Joi.string()
    .regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    )
    .message({
      'string.pattern.base':
        ' mobile number must have 10 digit  be valid, exemple (000)-000-0000 or (000)0000000 or 0000000000 ',
      'any.required':
        'Year should not be empty! check again  if you  added  year',
    })
    .required(),

    favorite: Joi.boolean(),
});

const vadidateAddContact = (req, res, next) => {
  const validateResult = contactAddSchema.validate(req.body);
  // console.log('validateResult: ', validateResult);
  const { error } = validateResult;

  if (error) throw HttpError(400, error.message);
  // якщо не буде всіх даних  error === true спрацює HttpError(400, validateResult.messages) і код перерветься спрацює функція обробки помилок
  //  error.message буде message з схеми валідації
  next();
};

export default vadidateAddContact;
