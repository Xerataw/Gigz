import { Text, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsDrawer from './SettingsDrawer';

interface IPhoneProps {}

const Phone: React.FC<IPhoneProps> = ({}) => {
  const { t } = useTranslation();
  const [value, setValue] = useDebouncedState<string>('', 1000);
  const [error, setError] = useState<string | boolean>();

  useEffect(() => {
    if (value.length > 0 && !/^[^01234589]\d{8}$/.test(value)) {
      setError(t('settings.phone.error'));
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
        route="phone"
        buttonLabel={t('settings.phone.button')}
        drawerLabel={t('settings.phone.title')}
        save={save}
        disabledSave={error === false ? false : true}
      >
        <TextInput
          mt="sm"
          icon={<Text size="sm">+33</Text>}
          label={t('settings.phone.input')}
          placeholder="612345678"
          onChange={(e) => setValue(e.target.value)}
          error={error}
        />
      </SettingsDrawer>
    </>
  );
};

export default Phone;
