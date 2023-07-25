import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/user';
import ArtistProfileView from '../../components/ProfileView/ArtistProfileView';
import HostProfileView from '../../components/ProfileView/HostProfileView';
import ProfileEditProvider from '../../store/ProfileEditProvider';
import { useUser } from '../../store/UserProvider';
import EProfileType from '../../types/EProfileType';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';
import Layout from '../Layout/Layout';
import { buildProfile } from '../../services/apiTypesHelper';

const Profile: React.FC = () => {
  const history = useHistory();
  const user = useUser();
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [profileType, setProfileType] = useState<EProfileType>();
  const [profile, setProfile] = useState<IArtistProfile | IHostProfile>();

  const displayProfileView = (): JSX.Element => {
    return profileType === EProfileType.ARTIST ? (
      <ArtistProfileView
        profile={profile as IArtistProfile}
        loading={profileLoading}
      />
    ) : (
      <HostProfileView
        profile={profile as IHostProfile}
        loading={profileLoading}
      />
    );
  };

  // Get the stored user information and query the profile
  useEffect(() => {
    getProfile(user.getProfileType() as EProfileType).then((profile) => {
      setProfileType(user.getProfileType() as EProfileType);
      setProfile(
        buildProfile(profile.data, user.getProfilePicture() as string)
      );
      setProfileLoading(false);
    });
  }, [history]);

  return (
    <ProfileEditProvider>
      <Layout navBarShadow={false}>{displayProfileView()}</Layout>
    </ProfileEditProvider>
  );
};

export default Profile;
