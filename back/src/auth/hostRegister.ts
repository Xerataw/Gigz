import express from 'express';

import useDatabase from '../composables/useDatabase';

const router = express.Router();

router.get('/', async (_, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the gigz api!',
  });
});

export default router;
