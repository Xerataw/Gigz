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
  capacityId: z.coerce.number().optional(),
  genres: z.string().min(1).optional(),
});

const buildHostsWhereCondition = (query: {
  name?: string;
  capacityId?: number;
  genres?: string;
}) => {
  return {
    name: {
      contains: query.name ? query.name : undefined,
    },
    capacity_id: {
      equals: query.capacityId ? query.capacityId : undefined,
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
    include: {
      capacity: true,
      account: {
        select: {
          account_genre: {
            select: {
              genre: true,
            },
          },
          profile_picture: true,
        },
      },
    },
    where: buildHostsWhereCondition(body.data),
  });

  let formattedData = data.map((host) => ({
    id: host.id,
    name: host.name,
    address: host.address,
    city: host.city,
    genres: host.account.account_genre.map((genre) => genre.genre),
    capacity: host.capacity,
    longitude: host.longitude,
    latitude: host.latitude,
    profilePicture: host.account.profile_picture,
  }));

  if (
    typeof req.account.longitude === 'number' &&
    typeof req.account.latitude === 'number'
  ) {
    formattedData = formattedData.sort((host1, host2) => {
      return (
        calculateDistance(
          req.account.longitude as number,
          host1.longitude as number,
          req.account.latitude as number,
          host1.latitude as number
        ) -
        calculateDistance(
          req.account.longitude as number,
          host2.longitude as number,
          req.account.latitude as number,
          host2.latitude as number
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

  sendResponse(res, fromDbFormat(formattedData), 200);
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
        },
      },
    },
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
  delete host.account;

  // @ts-ignore
  host.genre = formattedGenres;

  sendResponse(res, fromDbFormat(host));
});

export default router;
