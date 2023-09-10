import Contact from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import { normalisePhoneNumber } from '../helpers/index.js';

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({});
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findOne({ _id: contactId });

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
};

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create({
      ...req.body,
      phone: normalisePhoneNumber(req.body.phone),
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const updateContact = {
      ...req.body,
      // phone: normalisePhoneNumber(req.body.phone),
    };

    const result = await Contact.findOneAndUpdate(
      { _id: contactId }, // id
      { ...updateContact }, // те що треба обновити
      {
        new: true, // повернути оновлений контакт
        runValidators: true, // застосувати mongoose схему валідації
      }
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
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
};
export default {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  // deleteContactById,
};
