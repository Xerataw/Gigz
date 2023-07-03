import express from 'express';
import profile from '@v1/profile';

const router = express.Router();

router.use('/profiles', profile);

export default router;
