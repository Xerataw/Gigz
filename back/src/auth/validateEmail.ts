import express from 'express';
import z from 'zod';
import path from 'path';

import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';
import rateLimiter from '@/middlewares/rateLimiter';

const { sendError, ApiMessages } = useUtils();
const { database } = useDatabase();

const pathToPublic = '../../public';

const router = express.Router();

const UuidParamsSchema = z.object({
  uuid: z.string().uuid(),
});

router.get('/:uuid/', rateLimiter, async (req, res) => {
  const params = UuidParamsSchema.safeParse(req.params);

  if (!params.success) {
    console.log('Error: invalid param');
    return res.sendFile(path.join(__dirname, pathToPublic, 'notFound.html'));
  }

  const user = await database.account.findUnique({
    where: { user_id: params.data.uuid },
  });

  if (!user) {
    console.log('Error: uuid is not found');
    return res.sendFile(path.join(__dirname, pathToPublic, 'notFound.html'));
  }

  if (user.email_validated === 1) {
    return res.sendFile(path.join(__dirname, pathToPublic, 'emailAlreadyValidated.html'));
  }

  database.account.update({
    where: { user_id: user.user_id },
    data: {
      email_validated: 1
    }
  }).then(() => {
    return res.sendFile(path.join(__dirname, pathToPublic, 'emailValidated.html'));
  }).catch(err => {
    console.log('Error: can\'t validate the email', err);
    return res.sendFile(path.join(__dirname, pathToPublic, 'serverError.html'));
  })
});

export default router;
