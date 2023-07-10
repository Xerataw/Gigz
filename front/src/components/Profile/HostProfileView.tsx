// Logic
import {
  isBioSectionAvaiblable,
  isMapSectionAvailable,
  isSocialsSectionAvailable,
} from '../../services/SectionAvailability';

// Types
import IHostProfile from '../../types/IHostProfile';

// Sub components
import ProfileView from './ProfileView/ProfileView';
import Biography from './ProfileView/ProfileSections/Biography';
import LocationMap from './ProfileView/ProfileSections/LocationMap';
import Socials from './ProfileView/ProfileSections/Socials';

export interface IHostProfileViewProps {
  profile: IHostProfile;
}

export default function HostProfileView({ profile }: IHostProfileViewProps) {
  const getProfileSections = (profile: IHostProfile): JSX.Element[] => {
    const sections: JSX.Element[] = [];
    isBioSectionAvaiblable(profile.description) &&
      sections.push(
        <Biography key="bio" content={profile.description as string} />
      );
    isMapSectionAvailable(profile) &&
      sections.push(
        <LocationMap
          key="music"
          longitude={profile.longitude as number}
          latitude={profile.latitude as number}
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
