import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getChatList } from '../../api/Chat.api';
import Chat from './ChatItem/ChatItem';

const ChatList = () => {
  const [chatList, setChatList] = useState(new Array(20).fill({}));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChatList().then((res) => {
      setChatList(res.data ?? []);
      setLoading(false);
    });
  }, []);

  const renderChatList = () => {
    return chatList?.map((chat, index) => (
      <Chat key={index} chat={chat} loading={loading} />
    ));
  };

  return (
    <Container size={'xs'} px={0} pt={20}>
      {renderChatList()}
    </Container>
  );
};

export default ChatList;
