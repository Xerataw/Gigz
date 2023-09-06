import { ReactNode } from 'react';
import {
  default as IArtistProfile,
  default as IHostProfile,
} from '../../types/IArtistProfile';
import Settings from '../Settings/Settings';
import Gallery from './Gallery';
import ProfileDrawer from './ProfileDrawer';
import { useLocation } from 'react-router';

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

  const canEdit = useLocation().pathname.includes('/auth/profile');

  return (
    <div className="relative">
      {canEdit && <Settings />}
      <Gallery
        mediaList={profile?.gallery ?? []}
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
