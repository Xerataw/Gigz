// Types
import { ReactNode } from 'react';
import {
  default as IArtistProfile,
  default as IHostProfile,
} from '../../../types/IArtistProfile';

// Sub components
import ProfileDrawer from './ProfileDrawer';

interface IProfileViewProps {
  profile: IArtistProfile | IHostProfile;
  children: ReactNode;
}

const ProfileView: React.FC<IProfileViewProps> = ({ profile, children }) => {
  return (
    <>
      <ProfileDrawer profile={profile}>{children}</ProfileDrawer>
    </>
  );
};

export default ProfileView;
