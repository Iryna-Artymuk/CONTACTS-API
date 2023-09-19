import express from 'express';
import {
  getCurrentUser,
  userLogin,
  userLogout,
  userRegister,
} from '../../controllers/auth/index.js';
import {
  validateRegisterUser,
  validateLoginUser,
  authentication,
} from '../../middlewars/index.js';

const router = express.Router(); // create router

router.post('/users/register', validateRegisterUser, userRegister);
router.post('/users/login', validateLoginUser, userLogin);
router.delete('/users/logout', authentication, userLogout);
router.delete('/users/current', authentication, getCurrentUser);

export default router;
