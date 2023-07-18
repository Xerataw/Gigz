import { Badge } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import ProfileSection from './ProfileSection';
import { IconMapPin } from '@tabler/icons-react';

interface ILocationChipProps {
  address: string;
}

const LocationChip: React.FC<ILocationChipProps> = ({ address }) => {
  const { t } = useTranslation();

  return (
    <ProfileSection name={t('profile.locationMap.title')}>
      <Badge
        size="lg"
        radius="xl"
        className="pt-1 pl-[0.3rem]"
        leftSection={<IconMapPin className="pt-1" />}
      >
        {address}
      </Badge>
    </ProfileSection>
  );
};

export default LocationChip;
