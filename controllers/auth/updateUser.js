


import asyncHandler from '../../decorators/acyncHandler.js';
import User from '../../models/users/Users.js';

const updateUser = async (req, res) => {
  const { user } = req;

  const result = await User.findOneAndUpdate(
    { _id: user.id }, // id
    { ...req.body, password: user.password }, // те що треба обновити буде в req.body
    {
      new: true, // повернути оновлений контакт
      runValidators: true, // застосувати mongoose схему валідації
    }
  );

  res.status(200).json(result);
};

export default asyncHandler(updateUser);
