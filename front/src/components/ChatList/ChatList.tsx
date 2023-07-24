import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getChats } from '../../api/chat';
import IChat from '../../types/IChat';
import ChatItem from './ChatItem/ChatItem';

const ChatList: React.FC = () => {
  const [chatList, setChatList] = useState<IChat[]>(new Array(20).fill({}));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChats().then((res) => {
      setChatList(res.data ?? []);
      setLoading(false);
    });
  }, []);

  const renderChatList = () => {
    return chatList?.map((chat, index) => (
      <ChatItem key={index} chat={chat} loading={loading} />
    ));
  };

  // TODO Render something else if conversation list is empty
  return (
    <Container size={'xs'} px={0} pt={20}>
      {renderChatList()}
    </Container>
  );
};

export default ChatList;
