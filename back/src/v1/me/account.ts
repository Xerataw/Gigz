import express from 'express';
import { z } from 'zod';
import validator from 'validator';
import { readFile } from 'fs/promises';
import path from 'path';

import useHash from '@composables/useHash';
import useToken from '@composables/useToken';
import useUtils from '@composables/useUtils';
import useDatabase from '@composables/useDatabase';
import useEmail from '@composables/useEmail';
import rateLimiter from '@/middlewares/rateLimiter';

const router = express.Router();

const { generateToken } = useToken();
const { compare, hash } = useHash();
const { database, findAccountById } = useDatabase();
const { ApiMessages, sendResponse, sendError, fromDbFormat } = useUtils();
const { sendMail } = useEmail();

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

router.patch('/', rateLimiter, async (req, res) => {
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

  if (body.data.email) {
    const htmlToSend = await readFile(
      path.join(__dirname, '../../public', 'emailChangingEmail.html'),
      'utf8'
    );

    sendMail({
      to: account.email,
      subject: 'Votre mail à été modifié !',
      html: htmlToSend,
    });
  }

  if (body.data.password) {
    const htmlToSend = await readFile(
      path.join(__dirname, '../../public', 'emailChangingPassword.html'),
      'utf8'
    );

    sendMail({
      to: account.email,
      subject: 'Votre mot de passe à été modifié !',
      html: htmlToSend,
    });
  }

  const formattedAccount = {
    ...newAccount,
    account_genre: newAccount.account_genre.map((genre) => genre.id),
  };

  sendResponse(res, { ...fromDbFormat(formattedAccount), token });
});

router.delete('/', async (req, res) => {
  const account = await findAccountById(req.account.id);
  if (!account) return sendError(res, ApiMessages.WrongToken, 401);

  const deletedAccount = await database.account.delete({
    where: {
      id: req.account.id,
    },
  });
  sendResponse(res, fromDbFormat(deletedAccount), 200);
});

export default router;
