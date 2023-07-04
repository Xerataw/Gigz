import express from 'express';
import { z } from 'zod';
import multer from 'multer';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';

const router = express.Router();

const { database } = useDatabase();
const { ApiMessages, sendResponse, sendError } = useUtils();

const ArtistBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  genres: z.coerce.number().array().optional(),

  // Links
  spotify_link: z.string().optional(),
  instagram_link: z.string().optional(),
  facebook_link: z.string().optional(),
  soundcloud_link: z.string().optional(),
  youtube_link: z.string().optional(),
  apple_music_link: z.string().optional(),
  website_link: z.string().optional(),
  deezer_link: z.string().optional(),

  city_id: z.coerce.number().optional(),
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
    city_id: artist.city_id,
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
    update: body.data,
    create: { ...body.data, account_id: req.account.id },
  });

  // const formattedData = { ...data, account_genre: data. .account_genre.map(genre => genre.id) }

  sendResponse(res, data);
});

const HostBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  genres: z.coerce.number().array().optional(),

  // Links
  website_link: z.string().optional(),
  facebook_link: z.string().optional(),
  instagram_link: z.string().optional(),

  address: z.string().optional(),
  city_id: z.coerce.number().optional(),

  capacity_id: z.coerce.number().optional(),
  host_type_id: z.coerce.number().optional(),
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
    update: body.data,
    create: { ...body.data, account_id: req.account.id },
  });

  sendResponse(res, data);
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

    sendResponse(res, profile);
  }
);

export default router;
