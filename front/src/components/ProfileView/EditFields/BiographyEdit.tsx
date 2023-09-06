import { useState } from 'react';
import { Textarea } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useProfileEdit } from '../../../store/ProfileEditProvider';
import ProfileSection from '../ProfileSections/ProfileSection';
import { useUser } from '../../../store/UserProvider';
import EProfileType from '../../../types/EProfileType';

interface IBiographyEditProps {
  bio?: string;
}

const BiographyEdit: React.FC<IBiographyEditProps> = ({ bio }) => {
  const { t } = useTranslation();
  const { setEditedBio } = useProfileEdit();
  const userProfileType = useUser().getProfileType() as EProfileType;
  const [currentBio, setCurrentBio] = useState<string>(bio ? bio : '');

  const updateBio = (newContent: string) => {
    setCurrentBio(newContent);
    setEditedBio(newContent);
  };

  return (
    <div className={userProfileType === EProfileType.HOST ? 'mt-10' : ''}>
      <ProfileSection name={t('profile.biography.title')}>
        <Textarea
          onChange={(e) => updateBio(e.currentTarget.value)}
          value={currentBio}
          maxRows={6}
          minRows={6}
        ></Textarea>
      </ProfileSection>
    </div>
  );
};

export default BiographyEdit;
