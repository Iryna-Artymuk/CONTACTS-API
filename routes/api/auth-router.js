import express from 'express';
import {
  registerNewUser,
  userLogin,
  userLogout,
} from '../../controllers/auth/index.js';

const router = express.Router(); // create router

router.post('/register', registerNewUser);
router.post('/login', userLogin);
router.delete('/logout', userLogout);

export default router;
