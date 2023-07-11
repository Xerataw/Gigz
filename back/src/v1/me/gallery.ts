import express from 'express';
import multer from 'multer';

import { z } from 'zod';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';
import { unlink } from 'fs';

const router = express.Router();
const upload = multer({ dest: 'static/' });

const { database } = useDatabase();
const { ApiMessages, sendResponse, sendError, fromDbFormat } = useUtils();

const selectGallery = { id: true, media: true };

router.post('/', upload.array('media'), async (req, res) => {
  if (req.files === undefined) return sendError(res, ApiMessages.BadRequest);

  // @ts-ignore
  const files: { media: string; account_id: number }[] = req.files.map(
    (file) => ({ media: file.filename, account_id: req.account.id })
  );

  await database.gallery.createMany({ data: files });
  sendResponse(res, fromDbFormat(files));
});

const DeleteGallerySchema = z.object({
  id: z.coerce.number(),
});

router.delete('/:id/', async (req, res) => {
  const params = DeleteGallerySchema.safeParse(req.params);
  if (!params.success) return sendError(res, ApiMessages.BadRequest);

  const media = await database.gallery.findUnique({
    where: { id: params.data.id },
  });

  if (!media) return sendError(res, ApiMessages.NotFound, 404);
  if (media.account_id !== req.account.id)
    return sendError(res, ApiMessages.BadRequest);

  unlink(`./static/${media.media}`, async (error) => {
    if (error) {
      console.log(error);
      return sendError(res, ApiMessages.ServerError, 500);
    }

    const deleted = await database.gallery.delete({
      where: { id: params.data.id },
      select: selectGallery,
    });

    sendResponse(res, fromDbFormat(deleted));
  });
});

export default router;
