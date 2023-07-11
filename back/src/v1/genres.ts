import express from 'express';

import useDatabase from '@composables/useDatabase';
import useUtils from '@composables/useUtils';

const router = express.Router();
const { database } = useDatabase();
const { sendResponse } = useUtils();

router.get('/', async (_, res) => {
  const data = await database.genre.findMany();
  sendResponse(res, fromDbFormat(data), 200);
});

export default router;
