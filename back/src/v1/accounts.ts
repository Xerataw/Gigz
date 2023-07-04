import express from 'express';
import { z } from 'zod';
import validator from 'validator';

import useHash from '@composables/useHash';
import useToken from '@composables/useToken';
import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';

const router = express.Router();

const { generateToken } = useToken();
const { compare, hash } = useHash();
const { database, findAccountById } = useDatabase();
const { ApiMessages, sendResponse, sendError } = useUtils();

const AccountBodySchema = z.object({
  email: z.string().email().optional(),
  phoneNumber: z
    .string()
    .refine((phone) => validator.isMobilePhone(phone, 'fr-FR'))
    .optional(),

  password: z
    .object({
      current: z.string(),
      new: z.string(),
    })
    .optional(),
});

router.patch('/', async (req, res) => {
  const account = await findAccountById(req.account.id);
  if (!account) return sendError(res, ApiMessages.WrongToken, 401);

  const body = AccountBodySchema.safeParse(req.body);
  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  if (body.data.password !== undefined) {
    const success = await compare(body.data.password.current, account.password);
    if (!success) return sendError(res, ApiMessages.WrongCredentials);

    body.data.password.new = await hash(body.data.password.new);
  }

  const token = generateToken({
    id: account.id,
    email: body.data.email || account.email,
  });

  const newAccount = await database.account.update({
    where: { id: account.id },

    data: {
      email: body.data.email,
      phone_number: body.data.phoneNumber,

      password: body.data.password?.new,
    },

    select: {
      id: true,
      email: true,
      creation_date: true,
      phone_number: true,
      email_validated: true,
      account_genre: true,
    },
  });

  const formattedAccount = {
    ...newAccount,
    account_genre: newAccount.account_genre.map((genre) => genre.id),
  };
  sendResponse(res, { ...formattedAccount, token });
});

export default router;
