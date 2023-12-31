import { Container, Indicator, Skeleton, Text } from '@mantine/core';
import GigzFetcher from '../../../services/GigzFetcher';
import { IConversation } from '../../../types/chat/IChat';
import ProfilePicture from '../../ProfilePicture';

interface IChatItemProps {
  chat: IConversation | null;
  loading: boolean;
}

const ChatItem: React.FC<IChatItemProps> = ({
  chat = null,
  loading = false,
}) => {
  const date = new Date(chat?.latestMessage?.sendDate ?? '');
  const now = new Date();

  const lastMessage = () => {
    return now.getDay() === date.getDay() && now.getMonth() === date.getMonth()
      ? `Aujourd'hui à ${date.getHours()}:${date.getMinutes()} - ${
          chat?.latestMessage?.content
        }`
      : `Le ${date?.getDate()}/${
          date?.getMonth() + 1
        } à ${date.getHours()}:${date.getMinutes()} - ${
          chat?.latestMessage?.content
        }`;
  };

  return (
    <Container className="flex flex-row drop-shadow-xl gap-2 mb-4">
      <Skeleton visible={loading} width={70} height={64}>
        <Indicator
          inline
          color="tertiary"
          label={chat?.unread}
          disabled={loading || chat?.unread === 0}
          size={22}
          offset={3}
        >
          <ProfilePicture
            src={GigzFetcher.getImageUri(chat?.from?.profilePicture ?? '')}
            radius={20}
            size={64}
            alt={chat?.from?.name}
          />
        </Indicator>
      </Skeleton>
      <div className="flex flex-col justify-center pb-1">
        <Skeleton visible={loading} mb={loading ? 4 : 0}>
          <Text fw={chat?.unread === 0 ? 500 : 700}>
            {/* We need this never displayed 'UwU' text to show two loading skeletons */}
            {chat?.from?.name ?? 'UwU'}
          </Text>
        </Skeleton>
        <Skeleton visible={loading}>
          <Text
            c={chat?.unread === 0 ? 'dimmed' : ''}
            fw={chat?.unread === 0 ? 0 : 700}
            className="truncate w-60"
          >
            {lastMessage()}
          </Text>
        </Skeleton>
      </div>
    </Container>
  );
};

export default ChatItem;
