import {
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Title,
} from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { LinkUtils } from '../../services/LinkUtils';
import LightRoundButton from '../LightRoundButton';
import InsivibleMode from './InsivibleMode';
import Language from './Language';
import SettingsButton from './SettingsButton';
import Theme from './Theme';

const Settings: React.FC = () => {
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (window.location.pathname.includes('/settings')) setOpen(true);
  }, []);

  const handleOpenDrawer = () => {
    setOpen(true);
    const url = LinkUtils.concatenateURL(window.location.pathname, 'settings');
    history.push(url);
  };

  const handleCloseDrawer = () => {
    history.push('/auth/profile');
    setOpen(false);
  };

  return (
    <>
      <Drawer
        opened={open}
        onClose={handleCloseDrawer}
        position="right"
        className="z-[12001] bg-red-500 relative h-full"
        title={<p className="text-2xl">{t('settings.title')}</p>}
      >
        <Container>
          <Language />
          <Theme />
          <InsivibleMode />

          <Title order={3}>{t('settings.userAccount')}</Title>
          <div className="flex flex-col gap-3 ">
            <SettingsButton label={t('settings.email.button')} />
            <SettingsButton label={t('settings.password.button')} />
            <SettingsButton label={t('settings.phone.button')} />
          </div>
          <Divider m={15} />
        </Container>

        <div className="absolute left-0 bottom-0 w-full p-4">
          <Group position="center">
            <Button>Se déconnecter</Button>
            <Button>Supprimer mon compte</Button>
          </Group>
        </div>
      </Drawer>

      <div className="absolute z-50 p-3 right-0">
        <Group>
          <LightRoundButton onClick={handleOpenDrawer}>
            <IconSettings className="mr-[0.09rem] mt-[0.05rem]" />
          </LightRoundButton>
        </Group>
      </div>
    </>
  );
};

export default Settings;
