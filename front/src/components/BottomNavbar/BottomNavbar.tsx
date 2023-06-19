import { Overlay } from '@mantine/core';
import {
  IconHeart,
  IconMessageCircle,
  IconSearch,
  IconUserCircle,
} from '@tabler/icons-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import IconHref from '../../types/IconHref';
import Icon from '../Icon/Icon';

interface Props {
  isShadow?: boolean;
}
const icons: IconHref[] = [
  {
    path: '/liked',
    icon: <IconHeart />,
    label: 'Go to liked page',
  },
  {
    path: '/search',
    icon: <IconSearch />,
    label: 'Go to search page',
  },
  {
    path: '/conversations',
    icon: <IconMessageCircle />,
    label: 'Go to conversations page',
  },
  {
    path: '/profile',
    icon: <IconUserCircle />,
    label: 'Go to profile page',
  },
];

const BottomNavbar: React.FC<Props> = ({ isShadow }) => {
  return (
    <div>
      <div className="absolute bottom-0 w-full">
        {isShadow && (
          <div className="h-24 relative">
            <Overlay
              gradient="linear-gradient(0deg, rgba(255, 255, 255, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
              opacity={0.85}
            ></Overlay>
          </div>
        )}
        <div className="bg-white flex justify-around w-full">
          {icons.map((icon) => {
            return (
              <Link key={v4()} to={icon.path}>
                <Icon size="large" color="black">
                  {icon.icon}
                </Icon>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
