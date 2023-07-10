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

  const hasMusicEmbed =
    'musicLink' in profile &&
    typeof profile.musicLink === 'string' &&
    profile.musicLink.length > 0;

  return (
    <div>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(75% - ${hasMusicEmbed ? 200 : 100}px)`,
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
        swipeAreaWidth={hasMusicEmbed ? 280 : 180}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: hasMusicEmbed ? -280 : -180,
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
            musicLink={
              hasMusicEmbed ? (profile as IArtistProfile).musicLink : undefined
            }
          />
        </div>
        <ScrollArea className="-mt-12 p-4 pt-0 pb-16 bg-white" type="never">
          <div>{children}</div>
        </ScrollArea>
      </SwipeableDrawer>
    </div>
  );
}
