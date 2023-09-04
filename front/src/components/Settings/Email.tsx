import { TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { patchAccount } from '../../api/user';
import { useUser } from '../../store/UserProvider';
import SettingsDrawer from './SettingsDrawer';

const Email: React.FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useDebouncedState<string>('', 1000);
  const [error, setError] = useState<string | boolean>();
  const user = useUser();

  useEffect(() => {
    if (value.length > 0 && !/^\S+@\S+$/.test(value)) {
      setError(t('settings.email.error'));
    } else {
      setError(false);
    }
  }, [value]);

  const save = async (): Promise<boolean> => {
    return await patchAccount({ email: value ?? '' })
      .then((e) => {
        if (e.ok === true) {
          if (e.data?.token) {
            user.setToken(e.data?.token);
          } else {
            window.location.href = '/';
          }
          return true;
        } else {
          setError(e.message);
          return false;
        }
      })
      .catch((e) => {
        setError(e.message);
        return false;
      });
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
