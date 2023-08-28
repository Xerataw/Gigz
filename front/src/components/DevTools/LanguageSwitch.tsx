import { SegmentedControl } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../store/UserProvider';
import { fromStringToELanguage } from '../../types/ELanguage';

interface ILanguageSwitchProps {}

const LanguageSwitch: React.FC<ILanguageSwitchProps> = ({}) => {
  const user = useUser();
  const { t, i18n } = useTranslation();

  return (
    <SegmentedControl
      fullWidth
      data={[
        { value: 'fr', label: '🇫🇷' },
        { value: 'en', label: '🇬🇧' },
      ]}
      defaultValue={user.getLanguage()}
      onChange={(language) => {
        i18n.changeLanguage(language);
        user.setLanguage(fromStringToELanguage(language));
      }}
    />
  );
};

export default LanguageSwitch;
