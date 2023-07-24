import express from 'express';
import { z } from 'zod';

import useDatabase from '@composables/useDatabase';
import useUtils from '@composables/useUtils';

const router = express.Router();
const { database } = useDatabase();
const { sendResponse, sendError, ApiMessages } = useUtils();

const PostBodySchema = z.object({
  conversationId: z.coerce.number(),
  content: z.string(),
});

router.post('/', async (req, res) => {
  const body = PostBodySchema.safeParse(req.body);

  if (!body.success) {
    console.error('Error: invalid body parameters');
    return sendError(res, ApiMessages.BadRequest);
  }

  const conversation = await database.conversation.findUnique({
    where: { id: body.data.conversationId },
  });

  if (!conversation) {
    console.error(`Error: conversation ${body.data.conversationId} not found`);
    return sendError(res, ApiMessages.NotFound, 404);
  }

  if (
    req.account.id !== conversation.member_id &&
    req.account.id !== conversation.creator_id
  ) {
    console.error(
      `Error: not a member of conversation ${body.data.conversationId}`
    );
    return sendError(res, ApiMessages.BadRequest);
  }

  const recipientId =
    req.account.id === conversation.creator_id
      ? conversation.member_id
      : conversation.creator_id;

  const message = await database.message.create({
    data: {
      sender_id: req.account.id,
      recipient_id: recipientId,

      content: body.data.content,
      conversation_id: body.data.conversationId,
    },
  });

  // Update latest message in conversation
  await database.conversation.update({
    where: { id: message.conversation_id },
    data: { latest_message_id: message.id },
  });

  sendResponse(res, message);
});

export default router;