// Types
import { Skeleton } from '@mantine/core';
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
  return (
    <section className="mt-2 mb-5">
      <Skeleton visible={loading}>
        <h4 className="mb-2">{name}</h4>
      </Skeleton>
      <div>{children}</div>
    </section>
  );
};

export default ProfileSection;
