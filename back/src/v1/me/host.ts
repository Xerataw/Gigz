import express from 'express';
import { z } from 'zod';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';

const router = express.Router();

const { database } = useDatabase();
const { ApiMessages, sendResponse, sendError, fromDbFormat, toDbFormat } =
  useUtils();

const HostBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),

  // Links
  websiteLink: z.string().optional(),
  facebookLink: z.string().optional(),
  instagramLink: z.string().optional(),

  // Address
  address: z.string().optional(),
  city: z.string().optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),

  capacityId: z.coerce.number().optional(),
  hostTypeId: z.coerce.number().optional(),
});

router.patch('/', async (req, res) => {
  if (req.account.profileType !== 'host')
    return sendError(res, ApiMessages.WrongRoute);

  const body = HostBodySchema.safeParse(req.body);

  if (!body.success || Object.keys(body.data).length === 0) {
    return sendError(res, ApiMessages.BadRequest);
  }

  const data = await database.host.upsert({
    where: { account_id: req.account.id },
    update: toDbFormat(body.data),
    create: { ...toDbFormat(body.data), account_id: req.account.id },
  });

  sendResponse(res, fromDbFormat(data));
});

router.get('/', async (req, res) => {
  if (req.account.profileType !== 'host')
    return sendError(res, ApiMessages.WrongRoute);

  const host = await database.host.findUnique({
    where: { account_id: req.account.id },
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
  host.genres = formattedGenres;

  sendResponse(res, fromDbFormat(host));
});

export default router;
