import { IConversation } from '../../types/chat/IChat';

import { Textarea } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getChatById, postMessage } from '../../api/chat';
import { useChatNotification } from '../../store/ChatNotificationProvider';
import IMessage from '../../types/chat/IMessage';
import GigzScrollArea from '../GigzScrollArea';

interface IChatProps {
  chat?: IConversation;
}

const Chat: React.FC<IChatProps> = ({ chat }) => {
  const [page, setPage] = useState(1);
  const [conversationEndReached, setConversationEndReached] = useState(false);

  const [inputContent, setInputContent] = useState('');

  const { notificationCount } = useChatNotification();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!chat) {
      return;
    }

    setPage(1);
    getChatById(chat.id, 1).then((res) => {
      setMessages(res.data?.messages.reverse() ?? []);
    });
  }, [notificationCount]);

  const loadMoreMessages = () => {
    if (!chat) {
      return;
    }

    getChatById(chat.id, page + 1).then((res) => {
      if (res.data?.messages?.length === 0) {
        setConversationEndReached(true);
        return;
      }

      setMessages((old) => [...(res.data?.messages?.reverse() ?? []), ...old]);
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
      setInputContent('');

      if (!res.data) {
        // handle error
        return;
      }

      setMessages((old) => (res.data ? [...old, res.data] : [...old]));
    });
  };

  return (
    <>
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
