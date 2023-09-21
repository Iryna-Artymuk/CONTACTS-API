import path from 'path';
import fs from 'fs/promises';

import asyncHandler from '../../decorators/acyncHandler.js';
import User from '../../models/users/Users.js';

const updateAvatar = async (req, res) => {
  // const { subscription } = req.query;

  const { user, file } = req;

  const { path: oldPath = '', filename } = file;
  // path to folder where to save file permanent
  const avatarPath = path.resolve('public', 'images', 'avatars');

  // new path including filename
  const newPath = path.join(avatarPath, filename);


  // transfer file to permanent folder
  await fs.rename(oldPath, newPath);

  const avatarURL = path.join('avatars', filename); // path to file in DB it should be relating to server adress
  const result = await User.findOneAndUpdate(
    { _id: user.id }, // id
    { avatarURL }, // те що треба обновити буде в req.body
    {
      new: true, // повернути оновлений контакт
      runValidators: true, // застосувати mongoose схему валідації
    }
  );

  res.status(200).json(result);
};

export default asyncHandler(updateAvatar);
