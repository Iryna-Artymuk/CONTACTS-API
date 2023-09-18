import asyncHandler from '../../decorators/acyncHandler.js';
import Contact from '../../models/contacts.js';

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find({});
  res.json({ data: result, quantity: result.length });
};

export default asyncHandler(getAllContacts);
