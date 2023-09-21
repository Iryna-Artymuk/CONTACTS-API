import express from 'express';
import {
  getCurrentUser,
  updateAvatar,
  updateUser,
  userLogin,
  userLogout,
  userRegister,
} from '../../controllers/auth/index.js';
import {
  validateRegisterUser,
  validateLoginUser,
  authentication,
  vadidateSubscription,
  upload,
} from '../../middlewars/index.js';

const router = express.Router(); // create router

router.post('/users/register', validateRegisterUser, userRegister);
router.post('/users/login', validateLoginUser, userLogin);

router.patch('/users', authentication, vadidateSubscription, updateUser);
router.patch(
  '/users/avatars',
  authentication,
  upload.single('avatar'),
  updateAvatar
);

router.delete('/users/logout', authentication, userLogout);
router.delete('/users/current', authentication, getCurrentUser);

export default router;
