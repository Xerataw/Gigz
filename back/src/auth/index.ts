import express from 'express';

import login from './login';
import register from './register';
import validateEmail from './validateEmail';

const router = express.Router();

router.use('/login', login);
router.use('/register', register);
router.use('/validateEmail', validateEmail);

export default router;
