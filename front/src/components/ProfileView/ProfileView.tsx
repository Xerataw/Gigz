import { ReactNode } from 'react';
import {
  default as IArtistProfile,
  default as IHostProfile,
} from '../../types/IArtistProfile';
import Parameters from '../Settings/Settings';
import Gallery from './Gallery';
import ProfileDrawer from './ProfileDrawer';

interface IProfileViewProps {
  profile: IArtistProfile | IHostProfile;
  loading: boolean;
  children: ReactNode;
}

const ProfileView: React.FC<IProfileViewProps> = ({
  profile,
  loading,
  children,
}) => {
  const hasMusicEmbed =
    profile &&
    'musicLink' in profile &&
    typeof profile.musicLink === 'string' &&
    profile.musicLink.length > 0;

  return (
    <div className="relative">
      <Parameters />
      <Gallery
        mediaList={profile && profile.gallery}
        loading={loading}
        withEmbed={hasMusicEmbed}
      />
      <ProfileDrawer profile={profile} profileLoading={loading}>
        {children}
      </ProfileDrawer>
    </div>
  );
};

export default ProfileView;
