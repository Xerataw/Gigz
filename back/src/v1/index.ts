import express from 'express';
import profile from '@v1/profile';
import accounts from '@v1/accounts';
import genres from '@v1/genres';

const router = express.Router();

router.use('/profiles', profile);
router.use('/accounts', accounts);
router.use('/genres', genres);

export default router;
