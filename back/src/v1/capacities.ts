import useDatabase from '@composables/useDatabase';
import useUtils from '@composables/useUtils';
import express from 'express';

const { database } = useDatabase();
const { sendResponse, fromDbFormat } = useUtils();

const router = express.Router();

router.get('/', async (_, res) => {
  const data = await database.capacity.findMany();

  sendResponse(res, fromDbFormat(data), 200);
});

export default router;
