// Types
import { ReactNode } from 'react';
import IArtistProfile from '../../../types/IArtistProfile';
import IHostProfile from '../../../types/IArtistProfile';

// Sub components
import MediaCarousel from './MediaCarousel';
import ProfileDrawer from './ProfileDrawer';

export interface IProfileViewProps {
  profile: IArtistProfile | IHostProfile;
  children: ReactNode;
}

export default function ProfileView({ profile, children }: IProfileViewProps) {
  return (
    <>
      <MediaCarousel mediaList={profile.mediaList} />
      <ProfileDrawer profile={profile}>{children}</ProfileDrawer>
    </>
  );
}
