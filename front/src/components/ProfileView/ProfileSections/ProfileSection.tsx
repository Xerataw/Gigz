// Types
import { Header, Skeleton, Title, useMantineColorScheme } from '@mantine/core';
import { ReactNode } from 'react';

interface IProfileSectionProps {
  name: string;
  loading?: boolean;
  children: ReactNode;
}

const ProfileSection: React.FC<IProfileSectionProps> = ({
  name,
  loading = false,
  children,
}) => {
  const isLightTheme = useMantineColorScheme().colorScheme === 'light';

  return (
    <section className="mt-2 mb-5">
      <Skeleton visible={loading}>
        <Title
          order={4}
          className={
            'mb-2 ' + (isLightTheme ? ' text-black ' : ' text-gray-400 ')
          }
        >
          {name}
        </Title>
      </Skeleton>
      <div>{children}</div>
    </section>
  );
};

export default ProfileSection;
