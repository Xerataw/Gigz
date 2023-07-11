import express from 'express';
import multer from 'multer';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';
import { unlink } from 'fs';
import pictureRateLimiter from '@/middlewares/rateLimiter';

const router = express.Router();
const upload = multer({ dest: 'static/' });

const { database } = useDatabase();
const { ApiMessages, sendResponse, sendError } = useUtils();

router.patch(
  '/',
  pictureRateLimiter,
  upload.single('profile-picture'),
  async (req, res) => {
    if (req.file === undefined) return sendError(res, ApiMessages.BadRequest);

    let profile_picture = await database.profile_pictures.findUnique({
      where: { account_id: req.account.id },
    });

    if (profile_picture) {
      unlink(`./static/${profile_picture.media}`, async (error) => {
        if (error) {
          console.log(error);
          return sendError(res, ApiMessages.ServerError, 500);
        }
      });
    }

    profile_picture = await database.profile_pictures.upsert({
      where: { account_id: req.account.id },
      update: { media: req.file.filename },
      create: { account_id: req.account.id, media: req.file.filename },
    });

    if (!profile_picture) {
      return sendError(res, ApiMessages.NotFound);
    }

    sendResponse(res, { media: profile_picture.media });
  }
);

router.delete('/', async (req, res) => {
  let profile_picture = await database.profile_pictures.findUnique({
    where: { account_id: req.account.id },
  });

  if (!profile_picture) {
    return sendError(res, ApiMessages.NotFound, 404);
  }

  profile_picture = await database.profile_pictures.delete({
    where: { account_id: req.account.id },
  });

  unlink(`./static/${profile_picture.media}`, async (error) => {
    if (error) {
      console.log(error);
      return sendError(res, ApiMessages.ServerError, 500);
    }
  });

  sendResponse(res, { media: profile_picture.media });
});

export default router;
