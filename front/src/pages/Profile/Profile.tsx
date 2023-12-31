import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/user';
import ArtistProfileView from '../../components/ProfileView/ArtistProfileView';
import HostProfileView from '../../components/ProfileView/HostProfileView';
import { buildProfile } from '../../services/apiTypesHelper';
import { useProfileEdit } from '../../store/ProfileEditProvider';
import { useUser } from '../../store/UserProvider';
import EProfileType from '../../types/EProfileType';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';
import Layout from '../Layout/Layout';

const Profile: React.FC = () => {
  const history = useHistory();
  const user = useUser();
  const { editConfirmed, setInitialValues } = useProfileEdit();
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

  const fetchProfile = () => {
    getProfile(user.getProfileType() as EProfileType).then((profile) => {
      setProfileType(user.getProfileType() as EProfileType);
      setProfile(
        buildProfile({
          ...(profile.data as IArtistProfile | IHostProfile),
          profilePicture:
            user.getProfilePicture() !== null
              ? { media: user.getProfilePicture() as string }
              : undefined,
        })
      );
      setInitialValues(profile.data as IArtistProfile | IHostProfile);
      setProfileLoading(false);
    });
  };

  // Update profile data if page changed
  useEffect(() => fetchProfile(), [history, editConfirmed]);

  return <Layout navBarShadow={false}>{displayProfileView()}</Layout>;
};

export default Profile;
