import {
  Avatar,
  Overlay,
  useMantineColorScheme,
  Indicator,
} from '@mantine/core';
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconMessageCircle2Filled,
  IconSearch,
  IconUserCircle,
  IconZoomFilled,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getConversations } from '../api/chat';
import GigzFetcher from '../services/GigzFetcher';
import { useChatNotification } from '../store/ChatNotificationProvider';
import { useUser } from '../store/UserProvider';
import GigzIcon from './GigzIcon';

interface IBottomNavBarProps {
  isShadow?: boolean;
}

const BottomNavbar: React.FC<IBottomNavBarProps> = ({ isShadow }) => {
  const userPP = useUser().getProfilePicture();
  const { notificationCount, setNotificationCount } = useChatNotification();

  useEffect(() => {
    getConversations().then((res) => {
      const unread = res.data?.artists.map((chat) => chat.unread);

      if (unread && unread.length > 0) {
        setNotificationCount(unread.reduce((a, b) => a + b));
      }
    });
  });

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <div className="absolute bottom-0 w-full z-[10000]">
      {isShadow && (
        <div className="h-24 relative">
          <Overlay
            gradient={
              'linear-gradient(0deg, rgba(' +
              (isDark ? '26, 27, 30,' : '255, 255, 255,') +
              ' 0.95) 0%, rgba(0, 0, 0, 0) 100%)'
            }
            opacity={0.85}
          ></Overlay>
        </div>
      )}
      <ul
        className={
          'flex justify-around w-full ' +
          (isDark ? ' bg-[#1A1B1E] ' : ' bg-white ')
        }
      >
        <li>
          <Link to="/auth/liked">
            <GigzIcon
              size="medium"
              color="dark"
              icon={{
                icon: <IconHeart />,
                iconFilled: <IconHeartFilled />,
                fillColor: 'secondary',
                label: 'Go to liked page',
                path: '/auth/liked',
              }}
              isFilled={window.location.pathname === '/auth/liked'}
            />
          </Link>
        </li>
        <li>
          <Link to="/auth/search">
            <GigzIcon
              size="medium"
              color="dark"
              icon={{
                icon: <IconSearch />,
                iconFilled: <IconZoomFilled />,
                fillColor: 'primary',
                label: 'Go to search page',
                path: '/auth/search',
              }}
              isFilled={window.location.pathname === '/auth/search'}
            />
          </Link>
        </li>
        <li>
          <Link to="/auth/conversations">
            <GigzIcon
              size="medium"
              color="dark"
              icon={{
                icon: (
                  <Indicator
                    inline
                    label={notificationCount}
                    size={16}
                    disabled={notificationCount === 0}
                  >
                    {' '}
                    <IconMessageCircle />
                  </Indicator>
                ),
                iconFilled: (
                  <Indicator
                    inline
                    label={notificationCount}
                    size={16}
                    disabled={notificationCount === 0}
                  >
                    <IconMessageCircle2Filled />
                  </Indicator>
                ),
                fillColor: 'tertiary',
                label: 'Go to conversations page',
                path: '/auth/conversations',
              }}
              isFilled={window.location.pathname === '/auth/conversations'}
            />
          </Link>
        </li>
        <li>
          <Link to="/auth/profile">
            <GigzIcon
              size="medium"
              color="dark"
              icon={{
                path: '/auth/profile',
                icon: userPP ? (
                  <Avatar src={GigzFetcher.getImageUri(userPP)} radius="xl" />
                ) : (
                  <IconUserCircle />
                ),
                label: 'Go to profile page',
                fillColor: 'black',
                iconFilled: userPP ? (
                  <Avatar src={GigzFetcher.getImageUri(userPP)} radius="xl" />
                ) : (
                  <IconUserCircle />
                ),
              }}
              isFilled={window.location.pathname === '/auth/profile'}
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BottomNavbar;
