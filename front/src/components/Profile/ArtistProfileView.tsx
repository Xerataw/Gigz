// Logic
import {
  isBioSectionAvaiblable,
  isMusicSectionAvailable,
  isSocialsSectionAvailable,
} from '../../services/SectionAvailability';

// Types
import IArtistProfile from '../../types/IArtistProfile';

// Sub components
import ProfileView from './ProfileView/ProfileView';
import Biography from './ProfileView/ProfileSections/Biography';
import MusicProfiles from './ProfileView/ProfileSections/MusicProfiles';
import Socials from './ProfileView/ProfileSections/Socials';

export interface IArtistProfileViewProps {
  profile: IArtistProfile;
}

export default function ArtistProfileView({
  profile,
}: IArtistProfileViewProps) {
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
    <ProfileView profile={profile}>
      {getProfileSections(profile).map((section) => section)}
    </ProfileView>
  );
}