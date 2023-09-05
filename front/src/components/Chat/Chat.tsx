import IChat from '../../types/chat/IChat';

import { Textarea } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

import { useEffect, useRef, useState } from 'react';
import { getChatById, postMessage } from '../../api/chat';
import { ScrollArea, Text } from '@mantine/core';
import IMessage from '../../types/chat/IMessage';
import { useChatNotification } from '../../store/ChatNotificationProvider';

interface IChatProps {
  chat?: IChat;
}

const Chat: React.FC<IChatProps> = ({ chat }) => {
  const [page, setPage] = useState(1);
  const [conversationEndReached, setConversationEndReached] = useState(true);

  const [inputContent, setInputContent] = useState('');

  const { notificationCount } = useChatNotification();

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

    setPage(1);
    getChatById(chat.id, 1).then((res) => {
      setMessages(res.data?.messages ?? []);
    });
  }, [notificationCount]);

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
            } max-w-[70%] mb-2 px-2 py-1`}
          >
            {message.content}
          </Text>
        </div>
      );
    });
  };

  const sendMessage = () => {
    if (!chat) {
      return;
    }

    postMessage(chat.id, inputContent).then((res) => {
      // Handle error here
      setInputContent('');

      getChatById(chat.id, 1).then((res) => {
        setMessages(res.data?.messages ?? []);
      });
    });
  };

  return (
    <>
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
      <Textarea
        rightSection={
          <IconSend fill="orange" color="orange" onClick={sendMessage} />
        }
        placeholder="Message"
        minRows={1}
        value={inputContent}
        onChange={(event) => setInputContent(event.currentTarget.value)}
      />
    </>
  );
};

export default Chat;
