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

const ConversationParamsSchema = z.object({
  id: z.coerce.number(),
});

router.get('/:id/', async (req, res) => {
  const params = ConversationParamsSchema.safeParse(req.params);

  if (!params.success) {
    console.error('Error: invalid params arguments');
    return sendError(res, ApiMessages.BadRequest);
  }

  const conversation = await database.conversation.findUnique({
    where: { id: params.data.id },
    include: {
      _count: {
        select: {
          messages: {
            where: {
              seen: 0,
            },
          },
        },
      },

      messages: {
        orderBy: {
          send_date: 'desc',
        },
      },
    },
  });

  if (!conversation) {
    console.error(`Error: conversation ${params.data.id} not found`);
    return sendError(res, ApiMessages.NotFound, 404);
  }

  if (
    ![conversation.creator_id, conversation.member_id].includes(req.account.id)
  ) {
    console.error(`Error: not a member of conversation ${params.data.id}`);
    return sendError(res, ApiMessages.BadRequest);
  }

  // @ts-ignore
  conversation.unread_messages = conversation._count.messages;

  // @ts-ignore
  delete conversation._count;

  sendResponse(res, conversation);
});

export default router;
