import express from 'express';
import { z } from 'zod';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';

const router = express.Router();

const { database } = useDatabase();
const {
  ApiMessages,
  sendResponse,
  sendError,
  fromDbFormat,
  calculateDistance,
} = useUtils();

const searchFiltersBodySchemas = z.object({
  name: z.string().min(1).optional(),
  genres: z.string().min(1).optional(),
});

const buildArtistsWhereCondition = (query: {
  name?: string;
  genres?: string;
}) => {
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
  const body = searchFiltersBodySchemas.safeParse(req.query);

  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  const data = await database.artist.findMany({
    include: {
      account: {
        select: {
          account_genre: {
            include: {
              genre: true,
            },
          },
          profile_pictures: true,
        },
      },
    },
    where: buildArtistsWhereCondition(body.data),
  });

  let formattedData = data.map((artist) => ({
    id: artist.id,
    name: artist.name,
    city: artist.city,
    genres: artist.account.account_genre.map((genre) => genre.genre),
    longitude: artist.longitude,
    latitude: artist.latitude,
    profilePicture: artist.account.profile_pictures
  }));

  if (
    typeof req.account.longitude === 'number' &&
    typeof req.account.latitude === 'number'
  ) {
    formattedData = formattedData.sort((artist1, artist2) => {
      return (
        calculateDistance(
          req.account.longitude as number,
          artist1.longitude as number,
          req.account.latitude as number,
          artist1.latitude as number
        ) -
        calculateDistance(
          req.account.longitude as number,
          artist2.longitude as number,
          req.account.latitude as number,
          artist2.latitude as number
        )
      );
    });
  }

  formattedData.map((artist) => {
    // @ts-ignore
    delete artist.longitude;
    // @ts-ignore
    delete artist.latitude;
  });

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
          profile_pictures: true,
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
