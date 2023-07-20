import { ReactNode, useContext } from 'react';
import {
  default as IArtistProfile,
  default as IHostProfile,
} from '../../types/IArtistProfile';
import Gallery from './Gallery';
import ProfileDrawer from './ProfileDrawer';
import { ProfileContext } from '../../pages/Profile/Profile';

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
  
  const edit = useContext(ProfileContext).editMode;

  return (
    <>
      <p>test: {edit.toString()}</p>
      <Gallery
        mediaList={profile && profile.gallery}
        withEmbed={hasMusicEmbed}
      />
      <ProfileDrawer profile={profile}>{children}</ProfileDrawer>
    </>
  );
};

export default ProfileView;
