import { Skeleton } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import ProfileSection from './ProfileSection';

interface IBiographyProps {
  content: string;
  loading?: boolean;
}

const Biography: React.FC<IBiographyProps> = ({ content, loading = false }) => {
  const { t } = useTranslation();

  return (
    <ProfileSection name={t('profile.biography.title')} loading={loading}>
      <Skeleton visible={loading} className={loading ? 'w-full h-[30rem]' : ''}>
        <p>{content}</p>
      </Skeleton>
    </ProfileSection>
  );
};

export default Biography;
