import Contact from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import { normalisePhoneNumber } from '../helpers/index.js';





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
    const result = await Contact.findByIdAndDelete(contactId);

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

