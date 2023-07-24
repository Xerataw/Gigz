import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/user';
import ArtistProfileView from '../../components/ProfileView/ArtistProfileView';
import HostProfileView from '../../components/ProfileView/HostProfileView';
import { useUser } from '../../store/UserProvider';
import EMediaType from '../../types/EMediaType';
import EProfileType from '../../types/EProfileType';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';
import IMedia from '../../types/IMedia';
import Layout from '../Layout/Layout';

const Profile: React.FC = () => {
  const history = useHistory();
  const user = useUser();
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [profileType, setProfileType] = useState<EProfileType>();
  const [profile, setProfile] = useState<IArtistProfile | IHostProfile>();

  const buildProfile = (
    baseProfile: any,
    profilePicture?: string
  ): IArtistProfile | IHostProfile => {
    const finalGallery: IMedia[] = [];
    for (const galleryItem of baseProfile.gallery) {
      finalGallery.push({
        id: galleryItem.id,
        source: galleryItem.media,
        type: EMediaType.IMAGE,
      });
    }
    return {
      ...baseProfile,
      gallery: finalGallery.sort((media1, media2) => media1.id - media2.id),
      genres: baseProfile.genres ? baseProfile.genres : [],
      profilePicture,
    };
  };

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

  return <Layout navBarShadow={false}>{displayProfileView()}</Layout>;
};

export default Profile;
