import express from 'express';
import { z } from 'zod';

import useDatabase from '../composables/useDatabase';
import useUtils from '../composables/useUtils';

const { database, findAccountByEmail } = useDatabase();
const { ApiMessages } = useUtils();

const router = express.Router();

const PayloadSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.get('/', async (req, res) => {
  if (await findAccountByEmail(req.body.email)) {
    res.status(400).json({
      success: false,
      message: ApiMessages.EmailTaken,
    });
  }

  res.status(200).json({
    success: true,
    data: '',
  });
});

export default router;
