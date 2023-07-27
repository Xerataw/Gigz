import { TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsDrawer from './SettingsDrawer';

interface IEmailProps {}

const Email: React.FC<IEmailProps> = () => {
  const { t } = useTranslation();
  const [value, setValue] = useDebouncedState<string>('', 1000);
  const [error, setError] = useState<string | boolean>();

  useEffect(() => {
    if (value.length > 0 && !/^\S+@\S+$/.test(value)) {
      setError(t('settings.email.error'));
    } else {
      setError(false);
    }
  }, [value]);

  const save = (): boolean => {
    if (value.length === 0) return true;

    // TODO: return if request succeed return true to close the drawer
    //req
    return true;
  };

  return (
    <>
      <SettingsDrawer
        route="email"
        buttonLabel={t('settings.email.button')}
        drawerLabel={t('settings.email.title')}
        save={save}
        disabledSave={error === false ? false : true}
      >
        <TextInput
          error={error}
          autoFocus
          label={t('settings.email.input')}
          placeholder={t('settings.email.placeholder')}
          onChange={(e) => setValue(e.target.value)}
        />
      </SettingsDrawer>
    </>
  );
};

export default Email;
