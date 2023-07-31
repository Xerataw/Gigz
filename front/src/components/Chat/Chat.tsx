import IChat from '../../types/chat/IChat';

import { useEffect, useRef, useState } from 'react';
import { getChatById } from '../../api/chat';
import { ScrollArea, Text } from '@mantine/core';
import IMessage from '../../types/chat/IMessage';

interface IChatProps {
  chat?: IChat;
}

const Chat: React.FC<IChatProps> = ({ chat }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [conversationEndReached, setConversationEndReached] = useState(true);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewport?.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [viewport]);

  useEffect(() => {
    if (!chat) {
      return;
    }

    if (conversationEndReached && scrollPosition.y === 0) {
      setPage((old) => old + 1);
      getChatById(chat.id, page).then((res) => {
        if (res.data?.messages.length === 0) {
          setConversationEndReached(false);
          return;
        }

        setMessages((old) => [...(res.data?.messages.reverse() ?? []), ...old]);
      });
    }
  }, [scrollPosition]);

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
    <ScrollArea
      viewportRef={viewport}
      className="h-full"
      type="never"
      onScrollPositionChange={onScrollPositionChange}
    >
      <div className="flex flex-col items-end justify-end">
        {renderMessages()}
      </div>
    </ScrollArea>
  );
};

export default Chat;
