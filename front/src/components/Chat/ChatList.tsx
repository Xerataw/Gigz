import { Container, Drawer } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getChats } from '../../api/chat';
import IChat from '../../types/chat/IChat';
import ChatItem from './ChatItem/ChatItem';
import { useDisclosure } from '@mantine/hooks';
import Chat from './Chat';
import { Avatar } from '@mui/material';
import GigzFetcher from '../../services/GigzFetcher';

const ChatList: React.FC = () => {
  const [chatList, setChatList] = useState<IChat[]>(new Array(20).fill({}));
  const [loading, setLoading] = useState(true);

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

  useEffect(() => {
    getChats().then((res) => {
      setChatList(res.data ?? []);
      setLoading(false);
    });
  }, []);

  const openChat = (chat: IChat) => {
    setSelectedChat(chat);
    open();
  };

  const renderChatList = () => {
    return chatList?.map((chat, index) => (
      <div key={index} onClick={() => openChat(chat)}>
        <ChatItem chat={chat} loading={loading} />
      </div>
    ));
  };

  // TODO Render something else if conversation list is empty
  return (
    <>
      <Drawer.Root opened={opened} position="right" onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content className="h-full flex flex-col">
          <Drawer.Header>
            <Drawer.CloseButton className="m-0" />
            <Drawer.Title className="m-auto">
              <div className="flex flex-col justify-center items-center gap-2 relative -left-[11px]">
                <Avatar
                  src={GigzFetcher.getImageUri(
                    selectedChat?.from?.profilePicture ?? ''
                  )}
                  alt="it's me"
                />
                {selectedChat?.from.name}
              </div>
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="flex flex-col flex-grow justify-end mb-[50px] overflow-hidden">
            <Chat chat={selectedChat} />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Container size={'xs'} px={0} pt={20}>
        {renderChatList()}
      </Container>
    </>
  );
};

export default ChatList;
