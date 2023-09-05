import { Container, Drawer } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { getConversations } from '../../api/chat';
import GigzFetcher from '../../services/GigzFetcher';
import { useChatNotification } from '../../store/ChatNotificationProvider';
import IConversationList, { IConversation } from '../../types/chat/IChat';
import SearchBar from '../Search/SearchBar';
import Chat from './Chat';
import ChatItem from './ChatItem/ChatItem';

const ConversationList: React.FC = () => {
  const [conversationList, setConversationList] = useState<IConversationList>({
    conversations: new Array(20).fill([]),
    isLastPage: false,
  } as IConversationList);
  const [loading, setLoading] = useState(true);

  const { decreaseNotificationCount, setNotificationCount, notificationCount } =
    useChatNotification();

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedChat, setSelectedChat] = useState<IConversation>();

  useEffect(() => {
    getConversations().then((res) => {
      setConversationList(res.data ?? getEmptyConversationList());
      setLoading(false);

      const unread = res.data?.conversations.map((chat) => chat.unread);

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
      setConversationList(res.data ?? getEmptyConversationList());
      setLoading(false);
    });
  }, [notificationCount]);

  const openChat = (chat: IConversation) => {
    setSelectedChat(chat);
    open();

    if (chat.unread > 0) {
      decreaseNotificationCount(chat.unread);
      chat.unread = 0;
    }
  };

  const getEmptyConversationList = (): IConversationList => {
    return { conversations: [], isLastPage: true };
  };

  const renderChatList = () => {
    return conversationList?.conversations.map((chat, index) => (
      <div key={index} onClick={() => openChat(chat)}>
        <ChatItem chat={chat} loading={loading} />
      </div>
    ));
  };

  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  const filterConversations = (filter: { name: string }) => {
    console.log(filter);
    // TODO
    getConversations().then((res) =>
      setConversationList(res.data ?? getEmptyConversationList())
    );
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
        <SearchBar
          form={form}
          onSubmit={filterConversations}
          hideCapacity
          hideGenreSelector
          hideLocationSelector
          hideProfileType
        />
        {renderChatList()}
      </Container>
    </>
  );
};

export default ConversationList;
