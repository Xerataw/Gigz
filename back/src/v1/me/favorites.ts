import express from 'express';
import { z } from 'zod';

import useDatabase from '@composables/useDatabase';
import useUtils from '@composables/useUtils';

const router = express.Router();
const { database } = useDatabase();
const { sendResponse, sendError, ApiMessages, fromDbFormat } = useUtils();

const favoriteBodySchema = z.object({
  id: z.coerce.number(),
});

router.get('/', async (req, res) => {
  const favorites = await database.liked_account.findMany({
    where: {
      liker_account: req.account.id,
    },
  });

  sendResponse(res, fromDbFormat(favorites));
});

router.post('/', async (req, res) => {
  const body = favoriteBodySchema.safeParse(req.body);

  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  const data = await database.liked_account.create({
    data: {
      liked_account: body.data.id,
      liker_account: req.account.id,
    },
  });

  sendResponse(res, fromDbFormat(data), 201);
});

router.delete('/', async (req, res) => {
  const body = favoriteBodySchema.safeParse(req.body);

  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  const favorite = await database.liked_account.findUnique({
    where: {
      liker_account_liked_account: {
        liked_account: body.data.id,
        liker_account: req.account.id,
      },
    },
  });

  if (!favorite) return sendError(res, ApiMessages.NotFound, 404);

  const data = await database.liked_account.delete({
    where: {
      liker_account_liked_account: {
        liked_account: body.data.id,
        liker_account: req.account.id,
      },
    },
  });

  sendResponse(res, fromDbFormat(data));
});

export default router;
