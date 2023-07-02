import { ReactNode, useState } from 'react';
import Profile from '../../types/IProfile';

// Sub components
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Global } from '@emotion/react';
import ProfileBanner from './ProfileBanner';
import { ScrollArea } from '@mantine/core';

export interface IProfileDrawerProps {
  profile: Profile;
  children: ReactNode;
}

export default function ProfileDrawer({
  profile,
  children,
}: IProfileDrawerProps) {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const toggleDrawer = () => setDrawerOpened(!drawerOpened);

  return (
    <div>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${100}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        open={drawerOpened}
        onOpen={toggleDrawer}
        onClose={toggleDrawer}
        anchor="bottom"
        disableSwipeToOpen={false}
        swipeAreaWidth={200}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -180,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <ProfileBanner
            username={profile.username}
            profilePicture={profile.profilePicture}
            city={profile.city}
            genres={profile.genres}
          />
        </div>
        <div className="-mt-12 p-4 pt-6 bg-white">
          <ScrollArea h="1000">{children}</ScrollArea>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
