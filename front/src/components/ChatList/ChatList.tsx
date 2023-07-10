import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getChatList } from '../../api/Chat.api';
import { IChat } from '../../types/Chat';
import Chat from './ChatItem/ChatItem';

const ChatList = () => {
  const [chatListElements, setChatListElements] = useState([] as any);

  useEffect(() => {
    renderChatList(new Array(20).fill({}), true);
    getChatList().then((res) => {
      renderChatList(res.data as IChat[], false);
    });
  }, []);

  const renderChatList = (chatList: IChat[], loading: boolean) => {
    const renderedChatList = chatList?.map((chat, index) => (
      <Chat key={index} chat={chat} loading={loading} />
    ));
    setChatListElements([...renderedChatList]);
  };

  return (
    <Container size={'xs'} px={0} pt={20}>
      {chatListElements}
    </Container>
  );
};

export default ChatList;
