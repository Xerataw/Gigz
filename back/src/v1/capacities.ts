import useDatabase from '@composables/useDatabase';
import useUtils from '@composables/useUtils';
import express from 'express';

const { database } = useDatabase();
const { ApiMessages, sendError, sendResponse, fromDbFormat } = useUtils();

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const data = await database.capacity.findMany();

    sendResponse(res, fromDbFormat(data), 200);
  } catch (e) {
    sendError(res, ApiMessages.SERVER_ERROR, 500);
  }
});

export default router;
