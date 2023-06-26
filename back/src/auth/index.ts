import express from 'express';

import login from './login';
import hostRegister from './hostRegister';

const router = express.Router();

router.use('/login/', login);
router.use('/host_register', hostRegister);

export default router;
