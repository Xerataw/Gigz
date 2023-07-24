import {
  isBioSectionAvaiblable,
  isMapSectionAvailable,
  isSocialsSectionAvailable,
} from '../../services/sectionAvailability';
import IHostProfile from '../../types/IHostProfile';
import Biography from './ProfileSections/Biography';
import LocationChip from './ProfileSections/LocationChip';
import LocationMap from './ProfileSections/LocationMap';
import Socials from './ProfileSections/Socials';
import ProfileView from './ProfileView';

interface IHostProfileViewProps {
  profile: IHostProfile;
  loading: boolean;
}

const HostProfileView: React.FC<IHostProfileViewProps> = ({
  profile,
  loading,
}) => {
  const getProfileSections = (profile: IHostProfile): JSX.Element[] => {
    const sections: JSX.Element[] = [];
    isBioSectionAvaiblable(profile.description) &&
      sections.push(
        <Biography key="bio" content={profile.description as string} />
      );
    if (isMapSectionAvailable(profile))
      sections.push(
        <LocationMap
          key="location"
          longitude={profile.longitude as number}
          latitude={profile.latitude as number}
        />
      );
    else if (typeof profile.address === 'string' && profile.address.length > 0)
      sections.push(<LocationChip key="location" address={profile.address} />);
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

export default HostProfileView;
