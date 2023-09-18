import Contact from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import { normalisePhoneNumber } from '../helpers/index.js';







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

