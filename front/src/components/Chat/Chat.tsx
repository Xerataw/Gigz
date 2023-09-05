import IChat, { IConversation } from '../../types/chat/IChat';

import { useEffect, useRef, useState } from 'react';
import { getChatById } from '../../api/chat';
import { ScrollArea, Text } from '@mantine/core';
import IMessage from '../../types/chat/IMessage';
import { useChatNotification } from '../../store/ChatNotificationProvider';
import GigzScrollArea from '../GigzScrollArea';

interface IChatProps {
  chat?: IConversation;
}

const Chat: React.FC<IChatProps> = ({ chat }) => {
  const [page, setPage] = useState(1);
  const [conversationEndReached, setConversationEndReached] = useState(false);

  const { notificationCount } = useChatNotification();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!chat) {
      return;
    }

    setPage((old) => old - old + 1);

    getChatById(chat.id, page).then((res) => {
      setMessages(res.data?.messages.reverse() ?? []);
    });
  }, [notificationCount]);

  const loadMoreMessages = () => {
    if (!chat) {
      return;
    }

    getChatById(chat.id, page + 1).then((res) => {
      if (res.data?.messages.length === 0) {
        setConversationEndReached(true);
        return;
      }

      setMessages((old) => [...(res.data?.messages.reverse() ?? []), ...old]);
    });
    setPage((old) => old + 1);
  };

  const renderMessages = () => {
    return messages?.map((message) => {
      const isMe = message.senderId !== chat?.from.id;
      return (
        <div
          key={message.id}
          className={`flex w-full justify-${isMe ? 'end' : 'start'}`}
        >
          <Text
            className={`rounded-lg text-white ${
              isMe ? 'bg-gigz-primary' : 'bg-gray-500'
            } w-fit mb-2 px-2 py-1`}
          >
            {message.content}
          </Text>
        </div>
      );
    });
  };

  return (
    <GigzScrollArea
      className="h-full"
      type="never"
      onBottomReached={loadMoreMessages}
      isLastPage={conversationEndReached}
      inverted
    >
      <div className="flex flex-col items-end justify-end">
        {renderMessages()}
      </div>
    </GigzScrollArea>
  );
};

export default Chat;
