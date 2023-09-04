import express from 'express';
import Joi from 'joi'; // бібліотека валідації

import { contactsService } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { normalisePhoneNumber } from '../../helpers/index.js';

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .message(' only allowed domain name .com .net .org '),

  phone: Joi.string()
    .regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    )
    .message(
      ' mobile number must have 10 digit  be valid, exemple (000)-000-0000 or (000)0000000 or   0000000000  '
    )
    .required(),
});
const router = express.Router(); // create router

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.getContactsList();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactsService.getContactById(contactId);

    // якщо id буде не правильний то moviesService.getMovieById поверне null (так працює база даних )null це не помилка а нам треба щоб коли id не вірний тобто коли база нічого не знайшла треба створти повертати помилку
    if (!result) {
      throw HttpError(
        404,
        `контакту з id:${id} не знайдено перевірте чи правильний id `
      );
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const validateResult = contactAddSchema.validate(req.body);
    const { error } = validateResult;

    if (error) throw HttpError(422, error.message);
    const result = await contactsService.addContact({
      ...req.body,
      phone: normalisePhoneNumber(req.body.phone),
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const validateResult = contactAddSchema.validate(req.body);
    const { error } = validateResult;

    if (error) throw HttpError(422, error.message);
    console.log(' normalisePhoneNumbe: ', normalisePhoneNumber);

    const updateContact = {
      ...req.body,
      phone: normalisePhoneNumber(req.body.phone),
    };

    console.log(' req.body.phone: ', req.body.phone);
    console.log(' updateContact: ', updateContact.phone);
    const result = await contactsService.updateContactById(
      contactId,
      updateContact
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactsService.deleteContactById(contactId);

    if (!result) {
      throw HttpError(
        404,
        `контакту з id:${contactId} не знайдено перевірте чи правильний id `
      );
    }

    res.json({
      message: ` Contact with id:${contactId} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
