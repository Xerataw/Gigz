import express from 'express';
import { z } from 'zod';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';

const router = express.Router();

const { database } = useDatabase();
const { ApiMessages, sendResponse, sendError, fromDbFormat } = useUtils();

router.get('/', async (_, res) => {
  const data = await database.host.findMany({
    include: {
      account: {
        include: {
          account_genre: {
            include: {
              genre: true,
            },
          },
        },
      },
    },
  });

  const formattedData = data.map((host) => ({
    id: host.id,
    name: host.name,
    cityId: host.city_id,
    genres: host.account.account_genre.map((genre) => genre.genre),
  }));

  sendResponse(res, formattedData);
});

const GetHostByIdParams = z.object({
  id: z.coerce.number(),
});

router.get('/:id/', async (req, res) => {
  const params = GetHostByIdParams.safeParse(req.params);

  if (!params.success) {
    return sendError(res, ApiMessages.BadRequest);
  }

  const host = await database.host.findUnique({
    where: { id: params.data.id },
    include: {
      account: {
        include: {
          gallery: {
            select: { id: true, media: true },
          },
        },
      },
    },
  });

  if (!host) {
    return sendError(res, ApiMessages.NotFound, 404);
  }

  // @ts-ignore
  host.gallery = host.account.gallery;

  // @ts-ignore
  delete host.account;

  sendResponse(res, fromDbFormat(host));
});

export default router;
