import { ReactNode } from 'react';
import {
  default as IArtistProfile,
  default as IHostProfile,
} from '../../types/IArtistProfile';
import Gallery from './Gallery';
import ProfileDrawer from './ProfileDrawer';

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
    <>
      <Gallery
        mediaList={profile && profile.gallery}
        withEmbed={hasMusicEmbed}
      />
      <ProfileDrawer profile={profile}>{children}</ProfileDrawer>
    </>
  );
};

export default ProfileView;
