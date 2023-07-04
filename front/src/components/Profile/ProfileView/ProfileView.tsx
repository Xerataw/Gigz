import { ReactNode } from 'react';
import Profile from '../../types/IProfile';

// Sub components
import MediaCarousel from './MediaCarousel';
import ProfileDrawer from './ProfileDrawer';

export interface IProfileViewProps {
  profile: Profile;
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
