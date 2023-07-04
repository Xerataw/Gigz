import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/User.api';

// types
import User from '../../types/User';
import UserType from '../../types/UserType';
import ProfileType from '../../types/UserType';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';

// Sub components
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar';
import ArtistProfileView from '../../components/Profile/ArtistProfileView';
import HostProfileView from '../../components/Profile/HostProfileView';

const Profile: React.FC = () => {
  const history = useHistory();
  const [userType, setUserType] = useState<UserType>();
  const [profile, setProfile] = useState<IArtistProfile | IHostProfile>();

  const redirectToLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    User.getInstance()
      .then((user) => {
        if (user.getToken() === null) redirectToLogin();
        getProfile().then((profile) => {
          setUserType(user.getUserType() as ProfileType);
          setProfile(profile.data);
        });
      })
      .catch(() => redirectToLogin());
  }, []);

  return (
    <>
      {userType === UserType.ARTIST ? (
        <ArtistProfileView profile={profile as IArtistProfile} />
      ) : (
        <HostProfileView profile={profile as IHostProfile} />
      )}
      <BottomNavbar />
    </>
  );
};

export default Profile;
