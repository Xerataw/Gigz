import express from 'express';
import { z } from 'zod';

import useDatabase from '@composables/useDatabase';
import useUtils from '@composables/useUtils';

const router = express.Router();
const { database } = useDatabase();
const {
  sendResponse,
  sendError,
  ApiMessages,
  fromDbFormat,
  isLastPage,
  calculateDistance,
  sliceArray,
} = useUtils();

const favoriteBodySchema = z.object({
  id: z.coerce.number(),
});

const favoritesBodySchema = z.object({
  page: z.coerce.number().default(1),
});

const searchFiltersBodySchemas = z.object({
  name: z.string().min(1).optional(),
  genres: z.string().min(1).optional(),
  longitude: z.coerce.number().optional(),
  latitude: z.coerce.number().optional(),
  page: z.coerce.number().default(1),
});

const filterByQueries = (query: { name?: string; genres?: string }) => {
  return {
    AND: {
      longitude: {
        not: null,
      },
      latitude: {
        not: null,
      },
    },
    name: {
      contains: query.name ? query.name : undefined,
    },
    account: query.genres
      ? {
          account_genre: {
            some: {
              genre_id: {
                in: query.genres.split(',').map((x) => +x),
              },
            },
          },
        }
      : undefined,
  };
};

router.get('/', async (req, res) => {
  const body = favoritesBodySchema.safeParse(req.body);
  const query = searchFiltersBodySchemas.safeParse(req.query);

  if (!body.success) return sendError(res, ApiMessages.BadRequest);
  if (!query.success) return sendError(res, ApiMessages.BadRequest);

  const PAGE_SIZE = 20;

  const favorites = await database.liked_account.findMany({
    where: {
      liker_account_id: req.account.id,
      liked_account: {
        OR: [
          {
            host: filterByQueries(query.data),
          },
          {
            artist: filterByQueries(query.data),
          },
        ],
      },
    },

    take: PAGE_SIZE,
    skip: Math.max((query.data.page - 1) * PAGE_SIZE, 0),

    include: {
      liked_account: {
        include: {
          host: {
            include: {
              account: {
                select: {
                  id: true,
                },
              },
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

  let newFavorites = [];

  if (
    typeof req.account.longitude === 'number' &&
    typeof req.account.latitude === 'number'
  ) {
    const searchLongitude = query.data.longitude
      ? query.data.longitude
      : req.account.longitude;

    const searchLatitude = query.data.latitude
      ? query.data.latitude
      : req.account.latitude;

    newFavorites = favorites.sort((profileA, profileB) => {
      return (
        calculateDistance(
          searchLatitude,
          searchLongitude,
          profileA.liked_account?.host?.latitude ??
            (profileA.liked_account?.artist?.latitude as number),
          profileA.liked_account?.host?.longitude ??
            (profileA.liked_account?.artist?.longitude as number)
        ) -
        calculateDistance(
          searchLatitude,
          searchLongitude,
          profileB.liked_account?.host?.latitude ??
            (profileB.liked_account?.artist?.latitude as number),
          profileB.liked_account?.host?.longitude ??
            (profileB.liked_account?.artist?.longitude as number)
        )
      );
    });
  }

  newFavorites = favorites.map((fav) => {
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

  const isLastPageReturn = isLastPage(newFavorites, body.data.page);

  const currentPageData = sliceArray(newFavorites, body.data.page);

  const returnedData = {
    isLastPage: isLastPageReturn,
    profiles: currentPageData,
  };

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
