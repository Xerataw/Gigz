import express from 'express';
import { z } from 'zod';

import useHash from '../composables/useHash';
import useUtils from '../composables/useUtils';
import useToken from '../composables/useToken';
import useDatabase from '../composables/useDatabase';

const router = express.Router();

const { compare } = useHash();
const { generateToken } = useToken();
const { findAccountByEmail } = useDatabase();
const { ApiMessages, sendError, sendResponse } = useUtils();

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post('/', async (req, res) => {
  const body = BodySchema.safeParse(req.body);
  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  const account = await findAccountByEmail(body.data.email);
  if (!account) return; // TODO use EmailTaken

  if (!(await compare(body.data.password, account.password)))
    return sendError(res, ApiMessages.WrongPassword);

  const token = generateToken({
    id: account.id,
    email: account.email,
  });

  return sendResponse(res, {
    token: token,
  });
});

export default router;