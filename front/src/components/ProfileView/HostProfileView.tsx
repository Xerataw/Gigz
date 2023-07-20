import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileLoadingContext } from '../../pages/Profile/Profile';
import {
  isBioSectionAvaiblable,
  isMapSectionAvailable,
  isSocialsSectionAvailable,
} from '../../services/sectionAvailability';
import IHostProfile from '../../types/IHostProfile';
import Biography from './ProfileSections/Biography';
import LocationMap from './ProfileSections/LocationMap';
import ProfileSection from './ProfileSections/ProfileSection';
import Socials from './ProfileSections/Socials';
import ProfileView from './ProfileView';
import LocationChip from './ProfileSections/LocationChip';

interface IHostProfileViewProps {
  profile: IHostProfile;
}

const HostProfileView: React.FC<IHostProfileViewProps> = ({ profile }) => {
  const { t } = useTranslation();
  const profileLoading = useContext(ProfileLoadingContext);

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
    <ProfileView profile={profile}>
      {profileLoading ? (
        <Biography loading={true} content={''} />
      ) : (
        getProfileSections(profile).map((section) => section)
      )}
    </ProfileView>
  );
};

export default HostProfileView;
