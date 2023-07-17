import { useEffect, useState, createContext } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/user';
import User from '../../store/User';
import EProfileType from '../../types/EProfileType';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';
import Layout from '../Layout/Layout';
import ArtistProfileView from '../../components/ProfileView/ArtistProfileView';
import HostProfileView from '../../components/ProfileView/HostProfileView';

export const ProfileLoadingContext = createContext<boolean>(true);

const Profile: React.FC = () => {
  const history = useHistory();
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [profileType, setProfileType] = useState<EProfileType>();
  const [profile, setProfile] = useState<IArtistProfile | IHostProfile>();

  const redirectToLogin = () => {
    history.push('/login');
  };

  const displayProfileView = (): JSX.Element => {
    return profileType === EProfileType.ARTIST ? (
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
        getProfile(user.getProfileType() as EProfileType).then((profile) => {
          setProfileType(user.getProfileType() as EProfileType);
          setProfile(profile.data);
          setProfileLoading(false);
        });
      })
      .catch(() => redirectToLogin());
  }, []);

  return (
    <ProfileLoadingContext.Provider value={profileLoading}>
      <Layout navBarShadow={false}>{displayProfileView()}</Layout>
    </ProfileLoadingContext.Provider>
  );
};

export default Profile;
