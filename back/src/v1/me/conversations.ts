import express from 'express';
import { z } from 'zod';

import useDatabase from '@composables/useDatabase';
import useUtils from '@composables/useUtils';

const router = express.Router();
const { database } = useDatabase();
const { sendResponse, sendError, fromDbFormat, ApiMessages } = useUtils();

const PostBodySchema = z.object({
  memberId: z.coerce.number(),
});

router.post('/', async (req, res) => {
  const body = PostBodySchema.safeParse(req.body);

  if (!body.success || body.data.memberId === req.account.id) {
    return sendError(res, ApiMessages.BadRequest);
  }

  const conversations = await database.conversation.findMany({
    where: {
      OR: [
        {
          creator_id: req.account.id,
          member_id: body.data.memberId,
        },

        // Also search for a conversation where the creator is the member of
        // the conversation we are trying to create.
        {
          creator_id: body.data.memberId,
          member_id: req.account.id,
        },
      ],
    },
  });

  console.log(conversations);

  if (conversations.length > 0) {
    // There is already a conversation
    return sendError(res, ApiMessages.BadRequest);
  }

  const conversation = await database.conversation.create({
    data: {
      creator_id: req.account.id,
      member_id: body.data.memberId,
    },
  });

  sendResponse(res, conversation);
});

router.get('/', async (req, res) => {
  const conversations = await database.conversation.findMany({
    where: {
      OR: [
        { creator_id: req.account.id },

        // Also search for a conversation where the you are the member
        // and not the creator.
        { member_id: req.account.id },
      ],
    },

    include: {
      latest_message: true,
    },
  });

  sendResponse(res, conversations);
});

export default router;
