// Sub components
import ProfileSection from './ProfileSection';

interface IBiographyProps {
  content: string;
}

const Biography: React.FC<IBiographyProps> = ({ content }) => {
  return (
    <ProfileSection name={'Biographie'}>
      <p>{content}</p>
    </ProfileSection>
  );
};

export default Biography;
