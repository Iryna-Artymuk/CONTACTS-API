import asyncHandler from '../../decorators/acyncHandler.js';
import Contact from '../../models/contacts.js';

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;

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
};

export default asyncHandler(updateContactById);
