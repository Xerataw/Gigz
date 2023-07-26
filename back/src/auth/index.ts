import express from 'express';

import login from './login';
import register from './register';
import validateEmail from './validateEmail';
import rateLimiter from '@/middlewares/rateLimiter';

const router = express.Router();

router.use('/login', login);
router.use('/register', register);
router.use('/validateEmail', rateLimiter, validateEmail);

export default router;
