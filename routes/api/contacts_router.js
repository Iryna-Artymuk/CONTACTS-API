import express from 'express';
import Joi from 'joi'; // бібліотека валідації

import { contactsService } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { normalisePhoneNumber } from '../../helpers/index.js';

const contactAddSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),

  phone: Joi.string()
    .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
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

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

export default router;
