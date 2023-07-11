import express from 'express';
import { z } from 'zod';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';

const router = express.Router();

const { database } = useDatabase();
const { ApiMessages, sendResponse, sendError, fromDbFormat } = useUtils();

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
        include: {
          account_genre: {
            include: {
              genre: true,
            },
          },
        },
      },
    },
    where: buildHostsWhereCondition(body.data),
  });

  const formattedData = data.map((host) => ({
    id: host.id,
    name: host.name,
    cityId: host.city_id,
    genres: host.account.account_genre.map((genre) => genre.genre),
    capacity: host.capacity,
  }));

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
