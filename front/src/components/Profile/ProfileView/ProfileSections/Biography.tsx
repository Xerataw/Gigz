// Sub components
import ProfileSection from './ProfileSection';

export interface IBiographyProps {
  content: string;
}

export default function Biography({ content }: IBiographyProps) {
  return (
    <ProfileSection name={'Biographie'}>
      <p>{content}</p>
    </ProfileSection>
  );
}
