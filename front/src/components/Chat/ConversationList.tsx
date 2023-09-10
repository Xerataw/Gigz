import { Container, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { getConversations } from '../../api/chat';
import GigzFetcher from '../../services/GigzFetcher';
import { useChatNotification } from '../../store/ChatNotificationProvider';
import IConversationList, { IConversation } from '../../types/chat/IChat';
import Chat from './Chat';
import ChatItem from './ChatItem/ChatItem';
import { useHistory } from 'react-router';

const ConversationList: React.FC = () => {
  const [conversationList, setConversationList] = useState<
    IConversationList | undefined
  >({
    artists: new Array(20).fill([]),
    isLastPage: false,
  });
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const { decreaseNotificationCount, setNotificationCount, notificationCount } =
    useChatNotification();

  const [opened, setOpened] = useState(false);
  const [selectedChat, setSelectedChat] = useState<IConversation>();

  useEffect(() => {
    getConversations().then((res) => {
      setConversationList(res.data);
      setLoading(false);

      if (history.location.search) {
        const conversationId = history.location.search.replace('?', '');
        history.replace('/auth/conversations');
        const conversation = res.data?.artists.find((conversation) => {
          console.log(conversation);
          return conversation.id === parseInt(conversationId ?? '');
        });
        conversation && openChat(conversation);
      }

      const unread = res.data?.artists.map((chat) => chat.unread);

      if (unread && unread.length > 0) {
        setNotificationCount(unread.reduce((a, b) => a + b));
      }
    });
  }, []);

  // Fetch list of conversations when receiving a private-message
  useEffect(() => {
    if (opened) {
      return;
    }

    getConversations().then((res) => {
      setConversationList(res.data);
      setLoading(false);
    });
  }, [notificationCount]);

  const openChat = (chat: IConversation) => {
    setSelectedChat(chat);
    setOpened(!opened);
    history.push('/auth/conversations/' + chat.id);

    if (chat.unread > 0) {
      decreaseNotificationCount(chat.unread);
      chat.unread = 0;
    }
  };

  const onClose = () => {
    setOpened(false);
    history.replace('/auth/conversations');
  };

  const renderConversationList = () => {
    return conversationList?.artists.map((chat, index) => (
      <div key={index} onClick={() => openChat(chat)}>
        <ChatItem chat={chat} loading={loading} />
      </div>
    ));
  };

  // TODO Render something else if conversation list is empty
  return (
    <>
      <Drawer.Root opened={opened} position="right" onClose={onClose}>
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
        {renderConversationList()}
      </Container>
    </>
  );
};

export default ConversationList;
