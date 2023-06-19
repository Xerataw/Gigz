import express from 'express';
import useDatabase from '../composition/useDatabase';

const router = express.Router();
const { database } = useDatabase();

router.get('/status', async (_, res) => {
  const a = await database.account.findMany({});

  res.status(200).json({
    status: 200,
    message: 'Welcome to the api!',
    data: a,
  });
});

export default router;
