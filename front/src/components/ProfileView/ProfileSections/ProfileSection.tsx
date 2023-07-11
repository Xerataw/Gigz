// Types
import { ReactNode } from 'react';

interface IProfileSectionProps {
  name: string;
  children: ReactNode;
}

const ProfileSection: React.FC<IProfileSectionProps> = ({ name, children }) => {
  return (
    <section className="mt-2 mb-5">
      <h4 className="mb-2">{name}</h4>
      <div>{children}</div>
    </section>
  );
};

export default ProfileSection;
