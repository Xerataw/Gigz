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

interface IArtistProfileViewProps {
  profile: IArtistProfile;
  loading: boolean;
}

const ArtistProfileView: React.FC<IArtistProfileViewProps> = ({
  profile,
  loading,
}) => {
  const getProfileSections = (profile: IArtistProfile): JSX.Element[] => {
    const sections: JSX.Element[] = [];
    isBioSectionAvaiblable(profile.description) &&
      sections.push(
        <Biography key="bio" content={profile.description as string} />
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
    <ProfileView profile={profile} loading={loading}>
      {loading ? (
        <Biography loading={true} content={''} />
      ) : (
        getProfileSections(profile).map((section) => section)
      )}
    </ProfileView>
  );
};

export default ArtistProfileView;
