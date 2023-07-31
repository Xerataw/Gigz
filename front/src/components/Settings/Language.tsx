import { Divider, SegmentedControl, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../store/UserProvider';
import { fromStringToELanguage } from '../../types/ELanguage';

const Language: React.FC = () => {
  const user = useUser();
  const { t, i18n } = useTranslation();

  return (
    <>
      <Title order={3}>{t('settings.language.title')}</Title>

      <SegmentedControl
        fullWidth
        data={[
          { value: 'fr', label: '🇫🇷 Français' },
          { value: 'en', label: '🇬🇧 English' },
        ]}
        defaultValue={user.getLanguage()}
        onChange={(language) => {
          i18n.changeLanguage(language);
          user.setLanguage(fromStringToELanguage(language));
        }}
      />
      <Divider m={15} />
    </>
  );
};

export default Language;
