// Logic
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/User.api';

// Types
import User from '../../types/User';
import UserType from '../../types/UserType';
import ProfileType from '../../types/UserType';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';

// Sub components
import Layout from '../Layout/Layout';
import ArtistProfileView from '../../components/Profile/ArtistProfileView';
import HostProfileView from '../../components/Profile/HostProfileView';
import IProfile from '../../types/IProfile';

const Profile: React.FC = () => {
  const history = useHistory();
  const [userType, setUserType] = useState<UserType>();
  const [profile, setProfile] = useState<IArtistProfile | IHostProfile>();

  const redirectToLogin = () => {
    history.push('/login');
  };

  function buildProfile(baseProfile: any): IProfile {
    return { ...baseProfile, mediaList: [], genres: [] };
  }

  const displayProfileView = (): JSX.Element => {
    return userType === UserType.ARTIST ? (
      <ArtistProfileView profile={profile as IArtistProfile} />
    ) : (
      <HostProfileView profile={profile as IHostProfile} />
    );
  };

  // Get the stored user information and query the profile
  useEffect(() => {
    User.getInstance()
      .then((user) => {
        if (user.getToken() === null) redirectToLogin();
        getProfile().then((profile) => {
          setUserType(user.getUserType() as ProfileType);
          setProfile(buildProfile(profile.data));
        });
      })
      .catch(() => redirectToLogin());
  }, []);

  return (
    <Layout navBarShadow={false}>
      {userType !== undefined && displayProfileView()}
    </Layout>
  );
};

export default Profile;
