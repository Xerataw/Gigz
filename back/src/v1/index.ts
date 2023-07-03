import express from 'express';
import profile from '@v1/profile';
import accounts from '@v1/accounts';

const router = express.Router();

router.use('/profiles', profile);
router.use('/accounts', accounts);

export default router;
