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
import MusicEmbed from './ProfileSections/MusicEmbeds/MusicEmbed';

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
            height: `calc(75% - ${hasMusicEmbed ? 150 : 100}px)`,
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
          />
        </div>
        <ScrollArea
          className={
            hasMusicEmbed
              ? 'p-4 pt-0 pb-16 bg-white'
              : 'p-4 pt-0 pb-16 bg-white -mt-12'
          }
          style={hasMusicEmbed ? { marginTop: '-9.2rem' } : undefined}
          type="never"
        >
          {hasMusicEmbed && (
            <div style={{ marginBottom: '-1em', visibility: 'visible' }}>
              <MusicEmbed musicLink={profile.musicLink as string} />
            </div>
          )}
          {children}
        </ScrollArea>
      </SwipeableDrawer>
    </div>
  );
}
