import asyncHandler from '../../decorators/acyncHandler';
import Contact from '../../models/contacts.js';

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;

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
};

export default asyncHandler(updateContactById);
