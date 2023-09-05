import { contactsService } from '../models/index.js';
import { HttpError } from '../helpers/index.js';
import { normalisePhoneNumber } from '../helpers/index.js';
import { schema } from '../schema/index.js';

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.getContactsList();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
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
};

const addContact = async (req, res, next) => {
  try {
    const validateResult = schema.contactAddSchema.validate(req.body);
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
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const validateResult = schema.contactAddSchema.validate(req.body);
    const { error } = validateResult;

    if (error) throw HttpError(422, error.message);

    const updateContact = {
      ...req.body,
      phone: normalisePhoneNumber(req.body.phone),
    };

    const result = await contactsService.updateContactById(
      contactId,
      updateContact
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
  deleteContactById,
};
