import express from 'express';

import artists from '@v1/artists';
import hosts from '@v1/hosts';

import capacities from '@v1/capacities';
import genres from '@v1/genres';

import me from '@v1/me';

const router = express.Router();

router.use('/artists', artists);
router.use('/hosts', hosts);

router.use('/capacities', capacities);
router.use('/genres', genres);

router.use('/me', me);

export default router;
