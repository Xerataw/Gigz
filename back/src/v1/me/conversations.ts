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

  sendResponse(res, fromDbFormat(conversation));
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

    select: {
      id: true,
      latest_message: true,
      _count: {
        select: {
          messages: {
            where: {
              seen: 0,
            },
          },
        },
      },

      creator: {
        select: {
          id: true,
          host: { select: { name: true } },
          artist: { select: { name: true } },
          profile_picture: true,
        },
      },

      member: {
        select: {
          id: true,
          host: { select: { name: true } },
          artist: { select: { name: true } },
          profile_picture: true,
        },
      },
    },
  });

  const formattedConversation = conversations.map((conversation) => {
    if (conversation.creator.id === req.account.id) {
      // @ts-ignore
      delete conversation.creator;

      // @ts-ignore
      conversation.from = conversation.member;

      // @ts-ignore
      delete conversation.member;
    } else {
      // @ts-ignore
      delete conversation.member;

      // @ts-ignore
      conversation.from = conversation.creator;

      // @ts-ignore
      delete conversation.creator;
    }

    // @ts-ignore
    if (conversation.from.artist) {
      // @ts-ignore
      conversation.from.name = conversation.from.artist.name;

      // @ts-ignore
      delete conversation.from.artist;

      // @ts-ignore
      delete conversation.from.host;
    } else {
      // @ts-ignore
      conversation.from.name = conversation.from.host.name;

      // @ts-ignore
      delete conversation.from.host;

      // @ts-ignore
      delete conversation.from.artist;
    }

    // @ts-ignore
    conversation.unread = conversation._count.messages;

    // @ts-ignore
    conversation.from.profilePicture = conversation.from.profile_picture?.media ?? null;

    // @ts-ignore
    delete conversation._count;

    return conversation;
  });

  sendResponse(res, fromDbFormat(formattedConversation));
});

const ConversationParamsSchema = z.object({
  id: z.coerce.number(),
});

const ConversationQuerySchema = z.object({
  take: z.coerce.number().default(20),
  page: z.coerce.number().min(1),
});

router.get('/:id/', async (req, res) => {
  const params = ConversationParamsSchema.safeParse(req.params);
  const query = ConversationQuerySchema.safeParse(req.query);

  if (!params.success || !query.success) {
    console.error('Error: invalid query or params parameters');
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
          send_date: 'asc',
        },

        take: query.data.take,
        skip: query.data.take * (query.data.page - 1),
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

  sendResponse(res, fromDbFormat(conversation));
});

export default router;
