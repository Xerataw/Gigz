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
  isLastPage,
  sliceArray,
} = useUtils();

const searchFiltersBodySchemas = z.object({
  name: z.string().min(1).optional(),
  capacities: z.string().optional(),
  genres: z.string().min(1).optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  page: z.coerce.number().default(1),
});

type SearchQueryType = z.infer<typeof searchFiltersBodySchemas>;

const buildHostsWhereCondition = (query: SearchQueryType) => {
  const a = query.capacities
    ?.split(',')
    .map((capacity) => parseInt(capacity))
    .filter((capacity) => !isNaN(capacity));

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
    capacity: {
      max: {
        gte: a?.at(0),
        lte: a?.at(1),
      },
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

  const data = await database.host.findMany({
    where: {
      ...buildHostsWhereCondition(body.data),
      account_id: {
        not: {
          equals: req.account.id,
        },
      },
    },

    include: {
      capacity: true,
      account: {
        select: {
          id: true,
          profile_picture: true,
          account_genre: {
            select: {
              genre: true,
            },
          },
        },
      },
    },
  });

  const likedAccounts = await database.liked_account.findMany({
    where: { liker_account_id: req.account.id },
  });

  let formattedData = data.map((host) => ({
    id: host.id,
    accountId: host.account.id,
    name: host.name,
    address: host.address,
    city: host.city,
    genres: host.account.account_genre.map((genre) => genre.genre),
    capacity: host.capacity,
    longitude: host.longitude,
    latitude: host.latitude,
    profilePicture: host.account.profile_picture,
    likedAccount: likedAccounts.find(
      (account) => account.liked_account_id === host.account_id
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

    formattedData = formattedData.sort((host1, host2) => {
      return (
        calculateDistance(
          searchLatitude,
          searchLongitude,
          host1.latitude as number,
          host1.longitude as number
        ) -
        calculateDistance(
          searchLatitude,
          searchLongitude,
          host2.latitude as number,
          host2.longitude as number
        )
      );
    });
  }

  formattedData.map((host) => {
    // @ts-ignore
    delete host.longitude;
    // @ts-ignore
    delete host.latitude;
  });

  formattedData = formattedData.filter((host) => host.id !== req.account.id);

  const isLastPageReturn = isLastPage(formattedData, body.data.page);

  const currentPageData = sliceArray(formattedData, body.data.page);

  const returnedData = {
    isLastPage: isLastPageReturn,
    profiles: currentPageData,
  };

  sendResponse(res, fromDbFormat(returnedData));
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
      capacity: true,
      account: {
        include: {
          gallery: {
            select: { id: true, media: true },
          },
          profile_picture: true,
          created_conversations: {
            where: {
              member_id: req.account.id,
            },
          },
          other_conversations: {
            where: {
              creator_id: req.account.id,
            },
          },
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

  if (!host) {
    return sendError(res, ApiMessages.NotFound, 404);
  }

  // @ts-ignore
  host.gallery = host.account.gallery;

  // @ts-ignore
  host.conversations = [
    ...host.account.created_conversations,
    ...host.account.other_conversations,
  ];

  // @ts-ignore
  delete host.account;

  // @ts-ignore
  host.genre = formattedGenres;

  // @ts-ignore
  host.likedAccount = likedAccounts.find(
    (account) => account.liked_account_id === host.account_id
  )
    ? true
    : false;

  sendResponse(res, fromDbFormat(host));
});

export default router;
