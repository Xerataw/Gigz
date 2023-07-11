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

const buildArtistsWhereCondition = (query: {
  name?: string;
  genres?: string;
}) => {
  return {
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

router.get('/artists', async (req, res) => {
  const body = searchFiltersBodySchemas.safeParse(req.query);

  if (!body.success) return sendError(res, ApiMessages.BadRequest);

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
    where: buildArtistsWhereCondition(body.data),
  });

  const formattedData = data.map((artist) => ({
    id: artist.id,
    name: artist.name,
    cityId: artist.city_id,
    genres: artist.account.account_genre.map((genre) => genre.genre),
  }));

  sendResponse(res, formattedData);
});

router.get('/hosts', async (req, res) => {
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

router.get('/', async (req, res) => {
  const procedure = {
    where: {
      account_id: req.account.id,
    },
  };

  const profile =
    req.account.profileType === 'host'
      ? await database.host.findUnique(procedure)
      : await database.artist.findUnique(procedure);

  if (!profile) return sendError(res, ApiMessages.ServerError, 500);
  sendResponse(res, fromDbFormat(profile));
});

const GetProfileParams = z.object({
  id: z.coerce.number(),
});

router.get('/artists/:id', async (req, res) => {
  const params = GetProfileParams.safeParse(req.params);
  if (!params.success) return sendError(res, ApiMessages.BadRequest);

  const profile = await database.artist.findUnique({
    where: { id: params.data.id },
  });

  if (!profile) return sendError(res, ApiMessages.NotFound, 404);

  sendResponse(res, fromDbFormat(profile));
});

router.get('/hosts/:id', async (req, res) => {
  const params = GetProfileParams.safeParse(req.params);
  if (!params.success) return sendError(res, ApiMessages.BadRequest);

  const profile = await database.host.findUnique({
    where: { id: params.data.id },
  });

  if (!profile) return sendError(res, ApiMessages.NotFound, 404);

  sendResponse(res, fromDbFormat(profile));
});

export default router;
