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
  longitude: z.coerce.number().optional(),
  latitude: z.coerce.number().optional(),
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
          profile_picture: true,
          account_genre: {
            select: {
              genre: true,
            },
          },
        },
      },
    },
    where: buildArtistsWhereCondition(body.data),
  });

  const likedAccounts = await database.liked_account.findMany({
    where: { liker_account_id: req.account.id },
  });

  let formattedData = data.map((artist) => ({
    id: artist.id,
    name: artist.name,
    city: artist.city,
    genres: artist.account.account_genre.map((genre) => genre.genre),
    longitude: artist.longitude,
    latitude: artist.latitude,
    profilePicture: artist.account.profile_picture,
    likedAccount: likedAccounts.find(
      (account) => account.liked_account_id === artist.account_id
    )
      ? true
      : false,
  }));

  if (
    typeof req.account.longitude === 'number' &&
    typeof req.account.latitude === 'number'
  ) {
    const searchLongitude = body.data.longitude
      ? body.data.longitude
      : req.account.longitude;
    const searchLatitude = body.data.latitude
      ? body.data.latitude
      : req.account.latitude;

    formattedData = formattedData.sort((artist1, artist2) => {
      return (
        calculateDistance(
          searchLatitude,
          searchLongitude,
          artist1.latitude as number,
          artist1.longitude as number
        ) -
        calculateDistance(
          searchLatitude,
          searchLongitude,
          artist2.latitude as number,
          artist2.longitude as number
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
          profile_picture: true,
        },
      },
    },
  });

  const likedAccounts = await database.liked_account.findMany({
    where: { liker_account_id: req.account.id },
  });

  const genres = await database.account_genre.findMany({
    where: { account_id: req.account.id },
    include: { genre: true },
  });

  const formattedGenres = genres.map((genre) => genre.genre);

  if (!artist) {
    return sendError(res, ApiMessages.NotFound, 404);
  }

  // @ts-ignore
  artist.gallery = artist.account.gallery;

  // @ts-ignore
  delete artist.account;

  // @ts-ignore
  artist.genres = formattedGenres;

  // @ts-ignore
  artist.likedAccount = likedAccounts.find(
    (account) => account.liked_account_id === artist.account_id
  )
    ? true
    : false;

  sendResponse(res, fromDbFormat(artist));
});

export default router;
