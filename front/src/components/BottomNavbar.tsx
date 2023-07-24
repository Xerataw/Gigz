import { Avatar, Overlay } from '@mantine/core';
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconMessageCircle2Filled,
  IconSearch,
  IconUserCircle,
  IconZoomFilled,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import GigzFetcher from '../services/GigzFetcher';
import { useUser } from '../store/UserProvider';
import GigzIcon from './GigzIcon';

interface IBottomNavBarProps {
  isShadow?: boolean;
}

const BottomNavbar: React.FC<IBottomNavBarProps> = ({ isShadow }) => {
  const userPP = useUser().getProfilePicture();

  return (
    <div className="absolute bottom-0 w-full z-[10000]">
      {isShadow && (
        <div className="h-24 relative">
          <Overlay
            gradient="linear-gradient(0deg, rgba(255, 255, 255, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
            opacity={0.85}
          ></Overlay>
        </div>
      )}
      <ul className="bg-white flex justify-around w-full">
        <li>
          <Link to="/auth/liked">
            <GigzIcon
              size="medium"
              color="dark"
              icon={{
                icon: <IconHeart />,
                iconFilled: <IconHeartFilled />,
                fillColor: 'primary',
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
                fillColor: 'secondary',
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
                icon: <IconMessageCircle />,
                iconFilled: <IconMessageCircle2Filled />,
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
