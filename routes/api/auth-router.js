import express from 'express';
import {
  getCurrentUser,
  resendVerifyUserEmail,
  updateAvatar,
  updateUser,
  userLogin,
  userLogout,
  userRegister,
  verifyUserEmail,
} from '../../controllers/auth/index.js';
import {
  validateRegisterUser,
  validateLoginUser,
  authentication,
  vadidateSubscription,
  upload,
  validateEmail,
} from '../../middlewars/index.js';

const router = express.Router(); // create router

router.post('/users/register', validateRegisterUser, userRegister);
router.post('/users/login', validateLoginUser, userLogin);
router.delete('/users/logout', authentication, userLogout);

router.patch('/users', authentication, vadidateSubscription, updateUser);
router.patch(
  '/users/avatars',
  authentication,
  upload.single('avatar'),
  updateAvatar
);

router.get('/users/current', authentication, getCurrentUser);

router.get('/users/verify/:verificationCode', verifyUserEmail);
router.post('/users/verify', validateEmail, resendVerifyUserEmail); // resent verificatin code
export default router;
