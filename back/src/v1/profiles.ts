import express from 'express';
import { z } from 'zod';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';

const router = express.Router();

const { database } = useDatabase();
const { ApiMessages, sendResponse, sendError, fromDbFormat } = useUtils();

router.get('/artists', async (_, res) => {
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

router.get('/hosts', async (_, res) => {
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
