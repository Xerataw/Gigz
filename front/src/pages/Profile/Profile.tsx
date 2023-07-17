import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/user';
import User from '../../store/User';
import EProfileType from '../../types/EProfileType';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';
import Layout from '../Layout/Layout';
import ArtistProfileView from '../../components/ProfileView/ArtistProfileView';
import HostProfileView from '../../components/ProfileView/HostProfileView';

const Profile: React.FC = () => {
  const history = useHistory();
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
          setProfile({
            ...(profile.data as IArtistProfile | IHostProfile),
            profilePicture: user.getProfilePicture() as string,
          });
        });
      })
      .catch(() => redirectToLogin());
  }, []);

  return (
    <Layout navBarShadow={false}>
      {profileType !== undefined && displayProfileView()}
    </Layout>
  );
};

export default Profile;
