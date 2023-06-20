import { Overlay } from '@mantine/core';
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconMessageCircle2Filled,
  IconSearch,
  IconUserCircle,
  IconZoomFilled,
} from '@tabler/icons-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import IconNavbar from '../../types/IconNavbar';
import Icon from '../Icon/Icon';

interface Props {
  isShadow?: boolean;
}
const icons: IconNavbar[] = [
  {
    path: '/liked',
    icon: <IconHeart />,
    label: 'Go to liked page',
    fillColor: 'primary',
    iconFilled: <IconHeartFilled />,
  },
  {
    path: '/search',
    icon: <IconSearch />,
    label: 'Go to search page',
    fillColor: 'secondary',
    iconFilled: <IconZoomFilled />,
  },
  {
    path: '/conversations',
    icon: <IconMessageCircle />,
    label: 'Go to conversations page',
    fillColor: 'tertiary',
    iconFilled: <IconMessageCircle2Filled />,
  },
  {
    path: '/profile',
    icon: <IconUserCircle />,
    label: 'Go to profile page',
    fillColor: 'dark',
    iconFilled: <IconUserCircle />,
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
                <Icon
                  size="medium"
                  color="dark"
                  icon={icon}
                  isFilled={window.location.pathname === icon.path}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
