import asyncHandler from '../../decorators/acyncHandler.js';
import Contact from '../../models/contacts.js';

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findOne({ _id: contactId });

  // якщо id буде не правильний то moviesService.getMovieById поверне null (так працює база даних )null це не помилка а нам треба щоб коли id не вірний тобто коли база нічого не знайшла треба створти повертати помилку
  if (!result) {
    throw HttpError(
      404,
      `контакту з id:${id} не знайдено перевірте чи правильний id `
    );
  }

  res.json(result);
};

export default asyncHandler(getContactById);
