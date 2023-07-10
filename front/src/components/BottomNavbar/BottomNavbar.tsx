import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Avatar, Overlay } from '@mantine/core';
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconMessageCircle2Filled,
  IconSearch,
  IconZoomFilled,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import IconNavbar from '../../types/IconNavbar';
import Icon from '../Icon/Icon';
import GigzFetcher from '../../services/GigzFetcher';
import User from '../../types/User';

interface Props {
  isShadow?: boolean;
}

const BottomNavbar: React.FC<Props> = ({ isShadow }) => {
  const history = useHistory();
  const [icons, setIcons] = useState<IconNavbar[]>([
    {
      path: '/auth/liked',
      icon: <IconHeart />,
      label: 'Go to liked page',
      fillColor: 'primary',
      iconFilled: <IconHeartFilled />,
    },
    {
      path: '/auth/search',
      icon: <IconSearch />,
      label: 'Go to search page',
      fillColor: 'secondary',
      iconFilled: <IconZoomFilled />,
    },
    {
      path: '/auth/conversations',
      icon: <IconMessageCircle />,
      label: 'Go to conversations page',
      fillColor: 'tertiary',
      iconFilled: <IconMessageCircle2Filled />,
    },
  ]);

  const redirectToLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    User.getInstance()
      .then((user) => {
        if (user.getToken() === null) redirectToLogin();
        const userPP = user.getProfilePicture();
        const ppIcon: IconNavbar = {
          path: '/auth/profile',
          icon: (
            <Avatar
              src={userPP && GigzFetcher.getImageUri(userPP)}
              radius="xl"
            />
          ),
          label: 'Go to profile page',
          fillColor: 'black',
          iconFilled: (
            <Avatar
              src={userPP && GigzFetcher.getImageUri(userPP)}
              radius="xl"
            />
          ),
        };
        setIcons([...icons, ppIcon]);
      })
      .catch(() => redirectToLogin());
  }, []);

  return (
    <>
      {icons.length === 4 && (
        <div style={{ zIndex: 10000 }} className="absolute bottom-0 w-full">
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
                <Link key={icon.path} to={icon.path}>
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
      )}
    </>
  );
};

export default BottomNavbar;
