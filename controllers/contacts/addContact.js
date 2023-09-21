import asyncHandler from '../../decorators/acyncHandler.js';
import { normalisePhoneNumber } from '../../helpers/index.js';
import Contact from '../../models/contacts.js';

const addContact = async (req, res, next) => {
  const { user } = req;
  const { _id: ownerId } = user;
  const result = await Contact.create({
    ...req.body,
    owner: ownerId ,
    phone: normalisePhoneNumber(req.body.phone),
  });

  res.status(201).json(result);
};

export default asyncHandler(addContact);
