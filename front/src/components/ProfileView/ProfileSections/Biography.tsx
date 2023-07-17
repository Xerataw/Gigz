import { Skeleton } from '@mantine/core';
import ProfileSection from './ProfileSection';

interface IBiographyProps {
  content: string;
  loading?: boolean;
}

const Biography: React.FC<IBiographyProps> = ({ content, loading = false }) => {
  return (
    <ProfileSection name={'Biographie'} loading={loading}>
      <Skeleton visible={loading} className={loading ? 'w-full h-[30rem]' : ''}>
        <p>{content}</p>
      </Skeleton>
    </ProfileSection>
  );
};

export default Biography;
