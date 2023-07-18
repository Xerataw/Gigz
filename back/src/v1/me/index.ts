import express from 'express';

import account from '@v1/me/account';
import artist from '@v1/me/artist';
import favorites from '@v1/me/favorites';
import gallery from '@v1/me/gallery';
import genres from '@v1/me/genres';
import host from '@v1/me/host';
import profilePicture from '@v1/me/profilePicture';
import conversations from '@v1/me/conversations';

const router = express.Router();

router.use('/artist', artist);
router.use('/host', host);

router.use('/gallery', gallery);
router.use('/account', account);

router.use('/conversations', conversations);

router.use('/genres', genres);
router.use('/profile-picture', profilePicture);

router.use('/favorites', favorites);

export default router;
