import { useContext } from 'react';
import {
  isBioSectionAvaiblable,
  isMusicSectionAvailable,
  isSocialsSectionAvailable,
} from '../../services/sectionAvailability';
import IArtistProfile from '../../types/IArtistProfile';
import Biography from './ProfileSections/Biography';
import MusicProfiles from './ProfileSections/MusicProfiles';
import Socials from './ProfileSections/Socials';
import ProfileView from './ProfileView';
import { ProfileLoadingContext } from '../../pages/Profile/Profile';

interface IArtistProfileViewProps {
  profile: IArtistProfile;
}

const ArtistProfileView: React.FC<IArtistProfileViewProps> = ({ profile }) => {
  const profileLoading = useContext(ProfileLoadingContext);

  const getProfileSections = (profile: IArtistProfile): JSX.Element[] => {
    const sections: JSX.Element[] = [];
    isBioSectionAvaiblable(profile.description) &&
      sections.push(
        <Biography
          loading={false}
          key="bio"
          content={profile.description as string}
        />
      );
    isMusicSectionAvailable(profile) &&
      sections.push(
        <MusicProfiles
          key="music"
          spotifyLink={profile.spotifyLink}
          soundCloudLink={profile.soundCloudLink}
          deezerLink={profile.deezerLink}
          youtubeLink={profile.youtubeLink}
          appleMusicLink={profile.appleMusicLink}
        />
      );
    isSocialsSectionAvailable(profile) &&
      sections.push(
        <Socials
          key="socials"
          instagramLink={profile.instagramLink}
          facebookLink={profile.facebookLink}
          websiteLink={profile.websiteLink}
        />
      );

    return sections;
  };

  return (
    <ProfileView profile={profile}>
      {profileLoading ? (
        <Biography loading={true} content={''} />
      ) : (
        getProfileSections(profile).map((section) => section)
      )}
    </ProfileView>
  );
};

export default ArtistProfileView;
