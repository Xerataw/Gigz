import express from 'express';
import { z } from 'zod';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';

const router = express.Router();

const { database } = useDatabase();
const { ApiMessages, sendResponse, sendError, fromDbFormat, toDbFormat } =
  useUtils();

const ArtistBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),

  // Links
  spotifyLink: z.string().optional(),
  instagramLink: z.string().optional(),
  facebookLink: z.string().optional(),
  soundcloudLink: z.string().optional(),
  youtubeLink: z.string().optional(),
  appleMusicLink: z.string().optional(),
  websiteLink: z.string().optional(),
  deezerLink: z.string().optional(),

  cityId: z.coerce.number().optional(),
});

router.patch('/', async (req, res) => {
  if (req.account.profileType !== 'artist')
    return sendError(res, ApiMessages.WrongRoute);

  const body = ArtistBodySchema.safeParse(req.body);

  if (!body.success || Object.keys(body.data).length === 0) {
    return sendError(res, ApiMessages.BadRequest);
  }

  const data = await database.artist.upsert({
    where: { account_id: req.account.id },
    update: toDbFormat(body.data),
    create: { ...body.data, account_id: req.account.id },
  });

  // const formattedData = { ...data, account_genre: data. .account_genre.map(genre => genre.id) }

  sendResponse(res, fromDbFormat(data));
});

router.get('/', async (req, res) => {
  if (req.account.profileType !== 'artist')
    return sendError(res, ApiMessages.WrongRoute);

  const artist = await database.artist.findUnique({
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

  if (!artist) {
    return sendError(res, ApiMessages.NotFound, 404);
  }

  // @ts-ignore
  artist.gallery = artist.account.gallery;

  // @ts-ignore
  delete artist.account;

  // @ts-ignore
  artist.genres = formattedGenres;

  sendResponse(res, fromDbFormat(artist));
});

export default router;
