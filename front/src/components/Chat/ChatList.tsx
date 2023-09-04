import { Container, Drawer } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getChats } from '../../api/chat';
import IChat from '../../types/chat/IChat';
import ChatItem from './ChatItem/ChatItem';
import { useDisclosure } from '@mantine/hooks';
import Chat from './Chat';
import { Avatar } from '@mui/material';
import GigzFetcher from '../../services/GigzFetcher';
import { useChatNotification } from '../../store/ChatNotificationProvider';

const ChatList: React.FC = () => {
  const [chatList, setChatList] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(true);

  const { decreaseNotificationCount, setNotificationCount, notificationCount } =
    useChatNotification();

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedChat, setSelectedChat] = useState<IChat>();

  useEffect(() => {
    getChats().then((res) => {
      setChatList(res.data ?? []);
      setLoading(false);

      const unread = res.data?.map((chat) => chat.unread);
      console.log(unread);

      if (unread && unread.length > 0) {
        setNotificationCount(unread.reduce((a, b) => a + b));
      }
    });
  }, []);

  // Fetch list of conversations when receiving a private-message
  useEffect(() => {
    getChats().then((res) => {
      setChatList(res.data ?? []);
      setLoading(false);
    });
  }, [notificationCount]);

  const openChat = (chat: IChat) => {
    console.log('unread#', chat.unread);

    if (chat.unread > 0) {
      console.log('decreasing');

      decreaseNotificationCount(chat.unread);
      chat.unread = 0;
    }

    console.log(notificationCount);

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
