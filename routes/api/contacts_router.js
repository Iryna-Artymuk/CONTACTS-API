import express from 'express';

import { contactsService } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
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

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

export default router;
