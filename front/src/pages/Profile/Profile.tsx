import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/user';
import ArtistProfileView from '../../components/ProfileView/ArtistProfileView';
import HostProfileView from '../../components/ProfileView/HostProfileView';
import ProfileEditProvider, {
  useProfileEdit,
} from '../../store/ProfileEditProvider';
import { useUser } from '../../store/UserProvider';
import EProfileType from '../../types/EProfileType';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';
import Layout from '../Layout/Layout';
import { buildProfile } from '../../services/apiTypesHelper';
import IMedia from '../../types/IMedia';
import IGenre from '../../types/IGenre';

const Profile: React.FC = () => {
  const history = useHistory();
  const user = useUser();
  const { editConfirmed } = useProfileEdit();
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
      console.log(profile);
      setProfileType(user.getProfileType() as EProfileType);
      setProfile(
        buildProfile(
          profile.data as IArtistProfile | IHostProfile,
          user.getProfilePicture() as string
        )
      );
      setProfileLoading(false);
    });
  };

  const adjustUpdatedProfile = () => {
    setProfile(
      buildProfile(
        {
          ...editConfirmed.updatedProfile,
          gallery: profile?.gallery as IMedia[],
          genres: profile?.genres as IGenre[],
        },
        user.getProfilePicture() as string
      )
    );
  };

  // Get the stored user information and query the profile
  useEffect(() => {
    if (editConfirmed.editConfirmed) {
      adjustUpdatedProfile();
    } else {
      fetchProfile();
    }
  }, [history, editConfirmed.editConfirmed]);

  return <Layout navBarShadow={false}>{displayProfileView()}</Layout>;
};

export default Profile;
