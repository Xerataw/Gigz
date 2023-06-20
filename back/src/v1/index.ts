import express from 'express';

const router = express.Router();

router.get('/status', async (_, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the gigz api!',
  });
});

export default router;
