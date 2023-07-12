import {
  isBioSectionAvaiblable,
  isMapSectionAvailable,
  isSocialsSectionAvailable,
} from '../../services/sectionAvailability';
import IHostProfile from '../../types/IHostProfile';
import Biography from './ProfileSections/Biography';
import LocationMap from './ProfileSections/LocationMap';
import Socials from './ProfileSections/Socials';
import ProfileView from './ProfileView';

interface IHostProfileViewProps {
  profile: IHostProfile;
}

const HostProfileView: React.FC<IHostProfileViewProps> = ({ profile }) => {
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
};

export default HostProfileView;
