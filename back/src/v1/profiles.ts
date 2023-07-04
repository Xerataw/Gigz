import express from 'express';
import { z } from 'zod';
import multer from 'multer';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';

const router = express.Router();

const { database } = useDatabase();
const { ApiMessages, sendResponse, sendError, fromDbFormat, toDbFormat } =
  useUtils();

const ArtistBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  genres: z.coerce.number().array().optional(),

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

const handleGenres = async (account_id: number, genres: number[]) => {
  const records = await database.account_genre
    .findMany({
      where: { account_id: account_id },
    })
    .then((records) => records.map((record) => record.genre_id));

  const toAdd = genres.filter((id) => !records.includes(id));
  const toDelete = records.filter((id) => !genres.includes(id));

  await database.account_genre.deleteMany({
    where: { account_id, genre_id: { in: toDelete } },
  });

  await database.account_genre.createMany({
    data: toAdd.map((genre_id) => ({ genre_id: genre_id, account_id })),
  });
};

router.get('/artists', async (_, res) => {
  const data = await database.artist.findMany({
    include: {
      account: {
        include: {
          account_genre: true,
        },
      },
    },
  });

  const formattedData = data.map((artist) => ({
    id: artist.id,
    name: artist.name,
    cityId: artist.city_id,
    genres: artist.account.account_genre.map((genre) => genre.id),
  }));

  sendResponse(res, formattedData);
});

router.patch('/artist', async (req, res) => {
  if (req.account.profileType !== 'artist')
    return sendError(res, ApiMessages.WrongRoute);

  const body = ArtistBodySchema.safeParse(req.body);
  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  if (body.data.genres !== undefined) {
    const genres = body.data.genres;
    delete body.data.genres;

    await handleGenres(req.account.id, genres);
  }

  const data = await database.artist.upsert({
    where: { account_id: req.account.id },
    update: toDbFormat(body.data),
    create: { ...body.data, account_id: req.account.id },
  });

  // const formattedData = { ...data, account_genre: data. .account_genre.map(genre => genre.id) }

  sendResponse(res, fromDbFormat(data));
});

const HostBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  genres: z.coerce.number().array().optional(),

  // Links
  websiteLink: z.string().optional(),
  facebookLink: z.string().optional(),
  instagramLink: z.string().optional(),

  address: z.string().optional(),
  cityId: z.coerce.number().optional(),

  capacityId: z.coerce.number().optional(),
  hostTypeId: z.coerce.number().optional(),
});

router.patch('/host', async (req, res) => {
  if (req.account.profileType !== 'host')
    return sendError(res, ApiMessages.WrongRoute);

  const body = HostBodySchema.safeParse(req.body);
  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  if (body.data.genres !== undefined) {
    const genres = body.data.genres;
    delete body.data.genres;

    await handleGenres(req.account.id, genres);
  }

  const data = await database.host.upsert({
    where: { account_id: req.account.id },
    update: toDbFormat(body.data),
    create: { ...body.data, account_id: req.account.id },
  });

  sendResponse(res, fromDbFormat(data));
});

const upload = multer({ dest: 'static/' });

router.patch(
  '/profile-picture/',
  upload.single('profile-picture'),
  async (req, res) => {
    if (req.file === undefined) return sendError(res, ApiMessages.BadRequest);

    const procedure = {
      where: { account_id: req.account.id },
      data: { profile_picture: req.file.filename },
    };

    const profile =
      req.account.profileType === 'host'
        ? await database.host.update(procedure)
        : await database.artist.update(procedure);

    sendResponse(res, fromDbFormat(profile));
  }
);

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

export default router;
