import asyncHandler from '../../decorators/acyncHandler.js';
import Contact from '../../models/contacts.js';

const getAllContacts = async (req, res) => {
  const { page = 1, limit = 10, favorite = true } = req.query; // деструктуризуємо параметри пошуку з фронтенду
  // додаємо ці параметри до запиту до БД
  const skip = (page - 1) * limit; // скільки обєктів пропустити з початку бази

  const result = await Contact.find({ favorite }, null, {
    skip,
    limit,
  }).populate('owner');
  res.json({ data: result, quantity: result.length });
};

export default asyncHandler(getAllContacts);
