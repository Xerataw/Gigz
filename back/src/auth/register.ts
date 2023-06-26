import express from 'express';
import { z } from 'zod';
import validator from 'validator';

import useDatabase from '../composables/useDatabase';
import useUtils from '../composables/useUtils';
import useHash from '../composables/useHash';
import useToken from '../composables/useToken';

const { database, findAccountByEmail } = useDatabase();
const { ApiMessages, sendResponse, sendError } = useUtils();
const { hash } = useHash();
const { generateToken } = useToken();

const router = express.Router();

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z
    .string()
    .refine((phone) => validator.isMobilePhone(phone, 'fr-FR'))
    .optional(),
});

router.post('/', async (req, res) => {
  const body = BodySchema.safeParse(req.body);
  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  if (await findAccountByEmail(req.body.email))
    return sendError(res, ApiMessages.EmailTaken);

  database.account
    .create({
      data: {
        email: body.data.email,
        password: await hash(body.data.password),
        phone_number: body.data.phoneNumber,
      },
    })
    .then((newAccount) => {
      sendResponse(
        res,
        {
          token: generateToken({ id: newAccount.id, email: newAccount.email }),
        },
        201
      );
    });
});

export default router;
