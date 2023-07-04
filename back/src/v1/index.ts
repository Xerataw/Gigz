import express from 'express';
import profiles from '@v1/profiles';
import accounts from '@v1/accounts';
import capacities from '@v1/capacities';
import genres from '@v1/genres';

const router = express.Router();

router.use('/profiles', profiles);
router.use('/accounts', accounts);
router.use('/capacities', capacities);
router.use('/genres', genres);

export default router;
