import express from 'express';
import { z } from 'zod';

import useDatabase from '@composables/useDatabase';
import useUtils from '@composables/useUtils';

const router = express.Router();
const { database } = useDatabase();
const { sendResponse, sendError, fromDbFormat, ApiMessages } = useUtils();

const PostGenresSchema = z.object({
  genreId: z.coerce.number(),
});

router.post('/', async (req, res) => {
  const body = PostGenresSchema.safeParse(req.body);
  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  let account_genre = await database.account_genre.findUnique({
    where: {
      account_id_genre_id: {
        account_id: req.account.id,
        genre_id: body.data.genreId,
      },
    },
  });

  if (account_genre) {
    return sendError(res, ApiMessages.BadRequest);
  }

  account_genre = await database.account_genre.create({
    data: {
      account_id: req.account.id,
      genre_id: body.data.genreId,
    },
  });

  sendResponse(res, fromDbFormat(account_genre));
});

const deleteGenresSchema = z.object({
  id: z.coerce.number(),
});

router.delete('/:id', async (req, res) => {
  const params = deleteGenresSchema.safeParse(req.params);

  if (!params.success) return sendError(res, ApiMessages.BadRequest);

  let account_genre = await database.account_genre.findUnique({
    where: {
      account_id_genre_id: {
        account_id: req.account.id,
        genre_id: params.data.id,
      },
    },
  });

  if (account_genre) {
    return sendError(res, ApiMessages.BadRequest);
  }

  account_genre = await database.account_genre.delete({
    where: {
      account_id_genre_id: {
        account_id: req.account.id,
        genre_id: params.data.id,
      },
    },
  });

  sendResponse(res, fromDbFormat(account_genre));
});

export default router;
