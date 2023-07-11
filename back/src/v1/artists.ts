import express from 'express';
import { z } from 'zod';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';

const router = express.Router();

const { database } = useDatabase();
const { ApiMessages, sendResponse, sendError, fromDbFormat } = useUtils();

router.get('/', async (_, res) => {
  const data = await database.artist.findMany({
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

  const formattedData = data.map((artist) => ({
    id: artist.id,
    name: artist.name,
    cityId: artist.city_id,
    genres: artist.account.account_genre.map((genre) => genre.genre),
  }));

  sendResponse(res, formattedData);
});

const GetArtistByIdParams = z.object({
  id: z.coerce.number(),
});

router.get('/:id/', async (req, res) => {
  const params = GetArtistByIdParams.safeParse(req.params);

  if (!params.success) {
    return sendError(res, ApiMessages.BadRequest);
  }

  const artist = await database.artist.findUnique({
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

  if (!artist) {
    return sendError(res, ApiMessages.NotFound, 404);
  }

  // @ts-ignore
  artist.gallery = artist.account.gallery;

  // @ts-ignore
  delete artist.account;

  sendResponse(res, fromDbFormat(artist));
});

export default router;
