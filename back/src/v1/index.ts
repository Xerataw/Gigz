import express from 'express';
import profile from '@v1/profile';
import accounts from '@v1/accounts';
import capacities from '@v1/capacities';

const router = express.Router();

router.use('/profiles', profile);
router.use('/accounts', accounts);
router.use('/capacities', capacities);

export default router;
