import { Skeleton } from '@mantine/core';
import ProfileSection from './ProfileSection';

interface IBiographyProps {
  content: string;
  loading?: boolean;
}

const loadingFalseContent =
  'Tempor consectetur eiusmod exercitation do voluptate mollit culpa et excepteur nostrud cillum culpa incididunt duis. Aliqua fugiat amet magna dolor cupidatat commodo nostrud deserunt consectetur duis non do. Dolore aliquip pariatur dolor nulla dolore elit proident duis. Officia reprehenderit consectetur ipsum id in laboris nisi excepteur velit. Sint esse esse laborum non laboris. Quis duis sunt qui proident commodo sit incididunt officia. Aute reprehenderit fugiat deserunt enim dolore velit non enim cupidatat amet enim in. Culpa labore duis ex veniam elit laborum occaecat occaecat aliquip. Ex pariatur reprehenderit adipisicing eiusmod cillum deserunt non ad laborum do in irure velit. Excepteur eu ipsum mollit consectetur dolor velit nulla ullamco magna cupidatat consequat.';

const Biography: React.FC<IBiographyProps> = ({ content, loading = false }) => {
  const contentToDisplay = loading ? loadingFalseContent : content;

  return (
    <ProfileSection name={'Biographie'} loading={loading}>
      <Skeleton visible={loading}>
        <p>{contentToDisplay}</p>
      </Skeleton>
    </ProfileSection>
  );
};

export default Biography;
