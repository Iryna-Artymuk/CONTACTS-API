import express from 'express';
import {
  registerNewUser,
  userLogin,
  userLogout,
} from '../../controllers/auth/index.js';

const router = express.Router(); // create router

router.post('/users/register', registerNewUser);
router.post('/users/login', userLogin);
router.delete('/users/logout', userLogout);

export default router;
