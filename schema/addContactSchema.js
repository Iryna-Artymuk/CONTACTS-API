import Joi from 'joi'; // бібліотека валідації
const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .message('only allowed domain name .com .net .org ')
    .required(),

  phone: Joi.string()
    .regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    )
    .message(
      ' mobile number must have 10 digit  be valid, exemple (000)-000-0000 or (000)0000000 or 0000000000 '
    )
    .required(),
});

export default {
  contactAddSchema,
};
