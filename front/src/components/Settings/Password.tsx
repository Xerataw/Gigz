import { PasswordInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { patchAccount } from '../../api/user';
import { PasswordUtils } from '../../services/PasswordUtils';
import { useUser } from '../../store/UserProvider';
import SettingsDrawer from './SettingsDrawer';

const Password: React.FC = () => {
  const user = useUser();
  const { t } = useTranslation();
  const [oldValue, setOldValue] = useDebouncedState<string>('', 1000);

  const [confirmation, setConfirmation] = useDebouncedState<string>('', 1000);
  const [value, setValue] = useDebouncedState<string>('', 1000);

  const [error, setError] = useState<any | boolean>();
  const [errorConfirmation, setErrorConfirmation] = useState<
    string | boolean
  >();

  const [areValid, setValid] = useState<boolean>(false);

  const validatePassword = () => {
    if (
      value.length > 0 &&
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
    ) {
      setError(PasswordUtils.errorPassword(value));
    } else {
      setError(false);
    }
  };

  const validatePasswordConfirmation = () => {
    if (confirmation.length > 0 && value !== confirmation) {
      setErrorConfirmation('Vous mot de passe ne correspondent pas');
    } else {
      setErrorConfirmation(false);
    }
  };

  useEffect(() => {
    validatePassword();
  }, [value]);

  useEffect(() => {
    validatePassword();
    validatePasswordConfirmation();
  }, [confirmation]);

  useEffect(() => {
    if (!error && !errorConfirmation) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [error, errorConfirmation]);

  const save = async (): Promise<boolean> => {
    return await patchAccount({
      password: { new: value, current: oldValue },
    })
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
        route="password"
        buttonLabel={t('settings.password.button')}
        drawerLabel={t('settings.password.title')}
        save={save}
        disabledSave={!areValid}
      >
        <PasswordInput
          autoFocus
          label={t('settings.password.inputOld')}
          placeholder={t('settings.password.placeholderOld')}
          onChange={(e) => setOldValue(e.target.value)}
        />
        <PasswordInput
          error={error}
          label={t('settings.password.input')}
          placeholder={t('settings.password.placeholder')}
          onChange={(e) => setValue(e.target.value)}
        />
        <PasswordInput
          error={errorConfirmation}
          label={t('settings.password.confirmation')}
          placeholder={t('settings.password.placeholder')}
          onChange={(e) => setConfirmation(e.target.value)}
        />
      </SettingsDrawer>
    </>
  );
};

export default Password;
