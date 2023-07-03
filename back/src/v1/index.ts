import express from 'express';
import profile from '@v1/profile';

const router = express.Router();

router.use('/profile', profile);

export default router;
