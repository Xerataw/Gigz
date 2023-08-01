import { PasswordInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PasswordUtils } from '../../services/PasswordUtils';
import SettingsDrawer from './SettingsDrawer';

const Password: React.FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useDebouncedState<string>('', 1000);
  const [error, setError] = useState<any | boolean>();

  const [confirmation, setConfirmation] = useDebouncedState<string>('', 1000);
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

  const save = (): boolean => {
    if (value.length === 0) return true;

    // TODO: return if request succeed return true to close the drawer
    if (areValid === true) {
      //req
      return true;
    }

    return false;
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
          error={error}
          autoFocus
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
