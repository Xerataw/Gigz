import { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/user';
import ArtistProfileView from '../../components/ProfileView/ArtistProfileView';
import HostProfileView from '../../components/ProfileView/HostProfileView';
import User from '../../store/User';
import EMediaType from '../../types/EMediaType';
import EProfileType from '../../types/EProfileType';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';
import IMedia from '../../types/IMedia';
import Layout from '../Layout/Layout';

export const ProfileLoadingContext = createContext<boolean>(true);

const Profile: React.FC = () => {
  const history = useHistory();
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [profileType, setProfileType] = useState<EProfileType>();
  const [profile, setProfile] = useState<IArtistProfile | IHostProfile>();

  const redirectToLogin = () => {
    history.push('/login');
  };

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
          console.log(profile);
          setProfileType(user.getProfileType() as EProfileType);
          setProfile(
            buildProfile(profile.data, user.getProfilePicture() as string)
          );
          setProfileLoading(false);
        });
      })
      .catch(() => redirectToLogin());
  }, [history]);

  return (
    <ProfileLoadingContext.Provider value={profileLoading}>
      {profile && <Layout navBarShadow={false}>{displayProfileView()}</Layout>}
    </ProfileLoadingContext.Provider>
  );
};

export default Profile;
