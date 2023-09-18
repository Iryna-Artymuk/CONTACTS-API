import express from 'express';
import {
  registerNewUser,
  userLogin,
  userLogout,
} from '../../controllers/auth/index.js';
import validateRegisterUser from '../../middlewars/validateRegisterUser.js';

const router = express.Router(); // create router

router.post('/users/register', validateRegisterUser, registerNewUser);
router.post('/users/login', userLogin);
router.delete('/users/logout', userLogout);

export default router;
