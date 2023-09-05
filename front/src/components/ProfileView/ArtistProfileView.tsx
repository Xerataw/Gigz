import {
  isBioSectionAvaiblable,
  isMapSectionAvailable,
  isMusicSectionAvailable,
  isSocialsSectionAvailable,
} from '../../services/sectionAvailability';
import { useProfileEdit } from '../../store/ProfileEditProvider';
import IArtistProfile from '../../types/IArtistProfile';
import BiographyEdit from './EditFields/BiographyEdit';
import MusicProfilesEdit from './EditFields/MusicProfilesEdit';
import SocialsEdit from './EditFields/SocialsEdit';
import Biography from './ProfileSections/Biography';
import LocationMap from './ProfileSections/LocationMap';
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
  const { editMode } = useProfileEdit();

  const getProfileSections = (profile: IArtistProfile): JSX.Element[] => {
    const sections: JSX.Element[] = [];

    if (editMode) {
      sections.push(
        <BiographyEdit key="bio-edit" bio={profile?.description} />
      );
      sections.push(
        <SocialsEdit
          key="socials-edit"
          instagramLink={profile.instagramLink}
          facebookLink={profile.facebookLink}
          websiteLink={profile.websiteLink}
        />
      );
      sections.push(
        <LocationMap
          key="location"
          longitude={profile.longitude as number}
          latitude={profile.latitude as number}
          isEditMode={true}
          searchOnlyCity={true}
        />);
      sections.push(
        <MusicProfilesEdit
          key="socials"
          spotifyLink={profile.spotifyLink}
          deezerLink={profile.deezerLink}
          appleMusicLink={profile.appleMusicLink}
          youtubeLink={profile.youtubeLink}
          soundcloudLink={profile.soundcloudLink}
        />
      );
      return sections;
    }

    isBioSectionAvaiblable(profile.description) &&
      sections.push(
        <Biography key="bio" content={profile.description as string} />
      );
    isMusicSectionAvailable(profile) &&
      sections.push(
        <MusicProfiles
          key="music"
          spotifyLink={profile.spotifyLink}
          soundCloudLink={profile.soundcloudLink}
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
    isMapSectionAvailable(profile) &&
      sections.push(
        <LocationMap
          key="location"
          longitude={profile.longitude as number}
          latitude={profile.latitude as number}
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
