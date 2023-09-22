import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';

import asyncHandler from '../../decorators/acyncHandler.js';
import User from '../../models/users/Users.js';

const updateAvatar = async (req, res, next) => {
  const { user, file } = req;

  const { path: oldPath, filename } = file;
  // path to folder where to save file permanent
  const avatarPath = path.resolve('public', 'images', 'avatars');

  // new path including filename
  const newPath = path.join(avatarPath, filename);

  // transfer file to permanent folder
  await fs.rename(oldPath, newPath);

  // resise file in temp folder
  Jimp.read(newPath, function (err, image) {
    try {
      if (err) throw err;
      image.resize(250, 250).quality(50).write(newPath);
    } catch (error) {
      next(error);
    }
  });
  // save savePath to database

  const avatarURL = path.join('avatars', filename); // path to file in DB it should be relating to server adress other part of path we add in app.js when allows static file
  // const result = await User.findOneAndUpdate(
  //   { _id: user.id }, // id
  //   { avatarURL }, // те що треба обновити буде в req.body
  //   {
  //     new: true, // повернути оновлений контакт
  //     runValidators: true, // застосувати mongoose схему валідації
  //   }
  //       })

  const olduserAvatar = await User.findOne({ _id: user.id });
  const result = await User.findByIdAndUpdate(
    user.id,
    { avatarURL },
    {
      new: true, // повернути оновлений контакт
      runValidators: true, // застосувати mongoose схему валідації
    }
  );

  console.log('olduserAvatar.avatar: ', olduserAvatar.avatarURL);

  fs.unlink('./public/images/' + olduserAvatar.avatarURL, function (err) {
    if (err && err.code == 'ENOENT') {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error('Error occurred while trying to remove file');
    } else {
      console.info(`removed`);
    }
  });
 

  res.status(200).json({ avatarURL: avatarURL });
};

export default asyncHandler(updateAvatar);
