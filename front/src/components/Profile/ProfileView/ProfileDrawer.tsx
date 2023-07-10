// Logic
import { ReactNode, useState } from 'react';

// Types
import IArtistProfile from '../../../types/IArtistProfile';
import IHostProfile from '../../../types/IHostProfile';

// Sub components
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Global } from '@emotion/react';
import { ScrollArea } from '@mantine/core';
import ProfileBanner from './ProfileBanner';

export interface IProfileDrawerProps {
  profile: IArtistProfile | IHostProfile;
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
            height: `calc(75% - ${200}px)`,
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
        disableDiscovery={true}
        allowSwipeInChildren={false}
        swipeAreaWidth={280}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -280,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <ProfileBanner
            username={profile.name}
            profilePicture={profile.profilePicture}
            city={profile.city}
            genres={profile.genres}
            musicLink={(profile as IArtistProfile).musicLink}
          />
        </div>
        <ScrollArea className="-mt-12 p-4 pt-6 pb-16 bg-white" type="never">
          <div>{children}</div>
        </ScrollArea>
      </SwipeableDrawer>
    </div>
  );
}
