// Types
import { ReactNode } from 'react';

export interface IProfileSectionProps {
  name: string;
  children: ReactNode;
}

export default function ProfileSection({
  name,
  children,
}: IProfileSectionProps) {
  return (
    <section className="mt-2 mb-5">
      <h4 className="mb-2">{name}</h4>
      <div>{children}</div>
    </section>
  );
}
