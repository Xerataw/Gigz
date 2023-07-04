import express from 'express';

import useDatabase from '@composables/useDatabase';
import useUtils from '@composables/useUtils';

const router = express.Router();
const { database } = useDatabase();
const { ApiMessages, sendError, sendResponse, fromDbFormat } = useUtils();

router.get('/', async (_, res) => {
  try {
    const data = await database.genre.findMany({});

    sendResponse(res, fromDbFormat(data), 200);
  } catch (e) {
    sendError(res, ApiMessages.SERVER_ERROR, 500);
  }
});

export default router;
