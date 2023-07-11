import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/user';
import User from '../../store/User';
import {
  default as EUserType,
  default as ProfileType,
} from '../../types/EUserType';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';
import IProfile from '../../types/IProfile';
import Layout from '../Layout/Layout';
import ArtistProfileView from '../../components/ProfileView/ArtistProfileView';
import HostProfileView from '../../components/ProfileView/HostProfileView';

const Profile: React.FC = () => {
  const history = useHistory();
  const [userType, setUserType] = useState<EUserType>();
  const [profile, setProfile] = useState<IArtistProfile | IHostProfile>();

  const redirectToLogin = () => {
    history.push('/login');
  };

  const buildProfile = (baseProfile: any): IProfile => {
    return {
      ...baseProfile,
      mediaList: [],
      genres: [],
    };
  };

  const displayProfileView = (): JSX.Element => {
    return userType === EUserType.ARTIST ? (
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
