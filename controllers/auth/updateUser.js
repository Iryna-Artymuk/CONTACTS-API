import asyncHandler from '../../decorators/acyncHandler.js';
import User from '../../models/users/Users.js';

const updateUser = async (req, res) => {
  const { subscription } = req.query;
;
  const { user } = req;

  const result = await User.findOneAndUpdate(
    { _id: user.id }, // id
    { subscription }, // те що треба обновити
    {
      new: true, // повернути оновлений контакт
      runValidators: true, // застосувати mongoose схему валідації
    }
  );

  res.status(200).json(result);
};

export default asyncHandler(updateUser);
