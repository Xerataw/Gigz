import express from 'express';
import { z } from 'zod';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
import { readFile } from 'fs/promises';
import path from 'path';

import useDatabase from '@composables/useDatabase';
import useUtils from '@composables/useUtils';
import useHash from '@composables/useHash';
import useToken from '@composables/useToken';
import useEmail from '@composables/useEmail';

const { database, findAccountByEmail } = useDatabase();
const { ApiMessages, sendResponse, sendError } = useUtils();
const { hash } = useHash();
const { generateToken } = useToken();
const { sendMail } = useEmail();

const router = express.Router();

const RegisterBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z
    .string()
    .refine((phone) => validator.isMobilePhone(phone, 'fr-FR'))
    .optional(),
  profileType: z.union([z.literal('host'), z.literal('artist')]),
});

router.post('/', async (req, res) => {
  const body = RegisterBodySchema.safeParse(req.body);
  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  if (await findAccountByEmail(req.body.email))
    return sendError(res, ApiMessages.EmailTaken);

  if (body.data.phoneNumber !== undefined) {
    const account = await database.account.findUnique({
      where: { phone_number: body.data.phoneNumber },
    });

    if (account !== null) return sendError(res, ApiMessages.PhoneNumberTaken);
  }

  database.account
    .create({
      data: {
        email: body.data.email,
        password: await hash(body.data.password),
        phone_number: body.data.phoneNumber,
        profile_type: body.data.profileType,
        user_id: uuidv4(),
      },
    })
    .then((newAccount) => {
      createBlankProfile(body.data.profileType, newAccount.id);
      sendConfirmationEmail(newAccount.email, newAccount.user_id);
      sendResponse(
        res,
        {
          token: generateToken({ id: newAccount.id, email: newAccount.email }),
          userId: newAccount.user_id,
        },
        201
      );
    });
});

const verifyEmailBodySchema = z.object({
  email: z.string().email(),
});

router.post('/verifyEmail', async (req, res) => {
  const body = verifyEmailBodySchema.safeParse(req.body);
  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  if (await findAccountByEmail(req.body.email))
    return sendError(res, ApiMessages.EmailTaken);

  return sendResponse(res, {}, 200);
});

const verifyPhoneBodySchema = z.object({
  phoneNumber: z
    .string()
    .refine((phone) => validator.isMobilePhone(phone, 'fr-FR')),
});

router.post('/verifyPhone', async (req, res) => {
  const body = verifyPhoneBodySchema.safeParse(req.body);
  if (!body.success) return sendError(res, ApiMessages.BadRequest);

  const data = await database.account.findUnique({
    where: {
      phone_number: body.data.phoneNumber,
    },
  });

  if (data) return sendError(res, ApiMessages.PhoneNumberTaken);

  return sendResponse(res, {}, 200);
});

const createBlankProfile = async (profileType: string, id: number) => {
  if (profileType === 'artist') {
    await database.artist.create({
      data: {
        account_id: id,
      },
    });
  } else {
    await database.host.create({
      data: {
        account_id: id,
      },
    });
  }
};

const sendConfirmationEmail = async (email: string, uuid: string) => {
  let htmlToSend = await readFile(path.join(__dirname, '../../public', 'emailConfirmationTemplate.html'), 'utf8');
  if (process.env.NODE_ENV === 'production') {
    htmlToSend = htmlToSend.replace('$$LINK$$', 'http://<ipProd>/api/auth/validateEmail/' + uuid); //TODO REMPLIR PAR l'IP de PROD
  } else {
    htmlToSend = htmlToSend.replace('$$LINK$$', 'http://localhost:3000/api/auth/validateEmail/' + uuid); //TODO REMPLIR PAR l'IP de PROD
  }
  sendMail({
    to: email,
    subject: 'Confirmez votre email sur Gigz !',
    html: htmlToSend,
  });
};

export default router;
