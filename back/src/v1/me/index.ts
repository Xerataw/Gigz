import express from 'express';

import gallery from '@v1/me/gallery';

import host from '@v1/me/host';
import artist from '@v1/me/artist';

import genres from '@v1/me/genres';
import profilePicture from '@v1/me/profilePicture';

import account from '@v1/me/account';

const router = express.Router();

router.use('/gallery', gallery);

router.use('/artist', artist);
router.use('/host', host);

router.use('/account', account);

router.use('/genres', genres);
router.use('/profile-picture', profilePicture);

export default router;