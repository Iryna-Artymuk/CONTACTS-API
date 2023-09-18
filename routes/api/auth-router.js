import express from 'express';
import {
  userLogin,
  userLogout,
  userRegister,
} from '../../controllers/auth/index.js';
import {
  validateRegisterUser,
  validateLoginUser,
} from '../../middlewars/index.js';

const router = express.Router(); // create router

router.post('/users/register', validateRegisterUser, userRegister);
router.post('/users/login', validateLoginUser, userLogin);
router.delete('/users/logout', userLogout);

export default router;
