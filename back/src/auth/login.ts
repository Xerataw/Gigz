import express from 'express';
import { z } from 'zod';

import useHash from '../composables/useHash';
import useToken from '../composables/useToken';
import useDatabase from '../composables/useDatabase';

const router = express.Router();

const { compare } = useHash();
const { generateToken } = useToken();
const { findAccountByEmail } = useDatabase();

router.post('/', async (req, res) => {
  const BodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const body = BodySchema.safeParse(req.body);
  if (!body.success) return; // TODO

  const account = await findAccountByEmail(body.data.email);
  if (!account) return; // TODO

  if (!(await compare(body.data.password, account.password))) return; // TODO

  const token = generateToken({
    id: account.id,
    email: account.email,
  });

  res.status(200).json({
    success: true,
    data: {
      token: token,
    },
  });
});

export default router;
