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

const favoritesBodySchema = z.object({
  page: z.coerce.number().default(1),
});

router.get('/', async (req, res) => {
  const body = favoritesBodySchema.safeParse(req.body);

  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  const favorites = await database.liked_account.findMany({
    where: {
      liker_account_id: req.account.id,
    },

    include: {
      liked_account: {
        include: {
          host: {
            include: {
              capacity: {
                select: {
                  id: true,
                  max: true,
                },
              },

              host_type: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },

          artist: true,

          account_genre: {
            include: {
              genre: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const newFavorites = favorites.map((fav) => {
    const genres = fav.liked_account.account_genre.map((union) => ({
      id: union.genre.id,
      name: union.genre.name,
    }));

    if (fav.liked_account.host) {
      // @ts-ignore
      fav = fav.liked_account.host;

      // @ts-ignore
      fav.genres = genres;

      // @ts-ignore
      fav.profileType = 'host';
    } else {
      // @ts-ignore
      fav = fav.liked_account.artist;

      // @ts-ignore
      fav.genres = genres;

      // @ts-ignore
      fav.profileType = 'artist';
    }

    return fav;
  });

  const elementsPerPage = 20;

  const totalPages = Math.ceil(newFavorites.length / elementsPerPage);
  const isLastPage = body.data.page === totalPages;

  const startIndex = (body.data.page - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;

  const currentPageData = newFavorites.slice(startIndex, endIndex);

  const returnedData = { isLastPage: isLastPage, artists: currentPageData };

  sendResponse(res, fromDbFormat(returnedData));
});

router.post('/', async (req, res) => {
  const body = favoriteBodySchema.safeParse(req.body);

  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  const data = await database.liked_account.create({
    data: {
      liked_account_id: body.data.id,
      liker_account_id: req.account.id,
    },
  });

  sendResponse(res, fromDbFormat(data), 201);
});

router.delete('/:id', async (req, res) => {
  const params = favoriteBodySchema.safeParse(req.params);

  if (!params.success) return sendError(res, ApiMessages.BadRequest);

  const favorite = await database.liked_account.findUnique({
    where: {
      liker_account_id_liked_account_id: {
        liked_account_id: params.data.id,
        liker_account_id: req.account.id,
      },
    },
  });

  if (!favorite) return sendError(res, ApiMessages.NotFound, 404);

  const data = await database.liked_account.delete({
    where: {
      liker_account_id_liked_account_id: {
        liked_account_id: params.data.id,
        liker_account_id: req.account.id,
      },
    },
  });

  sendResponse(res, fromDbFormat(data));
});

export default router;
