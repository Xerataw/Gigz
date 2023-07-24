import { ReactNode } from 'react';
import {
  default as IArtistProfile,
  default as IHostProfile,
} from '../../types/IArtistProfile';
import Gallery from './Gallery';
import ProfileDrawer from './ProfileDrawer';
import { ActionIcon, Button, Group } from '@mantine/core';
import { IconSection, IconSettings } from '@tabler/icons-react';
import Settings from '../Settings/Settings';

interface IProfileViewProps {
  profile: IArtistProfile | IHostProfile;
  children: ReactNode;
}

const ProfileView: React.FC<IProfileViewProps> = ({ profile, children }) => {
  const hasMusicEmbed =
    profile &&
    'musicLink' in profile &&
    typeof profile.musicLink === 'string' &&
    profile.musicLink.length > 0;

  return (
    <div className="relative">
      <Settings />
      <Gallery
        mediaList={profile && profile.gallery}
        withEmbed={hasMusicEmbed}
      />
      <ProfileDrawer profile={profile}>{children}</ProfileDrawer>
    </div>
  );
};

export default ProfileView;
