import { ActionIcon, Button, Drawer, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArrowBackUpDouble,
  IconChevronRight,
  IconDeviceFloppy,
} from '@tabler/icons-react';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { LinkUtils } from '../../services/LinkUtils';

interface ISettingsDrawerProps {
  buttonLabel: string;
  drawerLabel: string;
  children: ReactNode;
  route: string;
  save: () => boolean;
  disabledSave: boolean;
}

const SettingsDrawer: React.FC<ISettingsDrawerProps> = ({
  buttonLabel,
  drawerLabel,
  children,
  route,
  save,
  disabledSave,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  const handleOpenDrawer = () => {
    open();
    const url = LinkUtils.concatenateURL(window.location.pathname, route);
    history.push(url);
  };

  const handleCloseDrawer = () => {
    history.push('/auth/profile/settings');
    close();
  };

  useEffect(() => {
    if (window.location.pathname.includes('/' + route)) open();
  }, []);

  return (
    <>
      <div className="w-full relative h-10 rounded p-2">
        <Text>{buttonLabel}</Text>
        <div className="absolute w-full h-full top-0 flex items-center justify-end p-2 px-4">
          <ActionIcon
            size="md"
            radius="lg"
            variant="outline"
            onClick={() => handleOpenDrawer()}
          >
            <IconChevronRight size="1rem" />
          </ActionIcon>
        </div>
      </div>

      <Drawer
        opened={opened}
        onClose={handleCloseDrawer}
        position="right"
        className="z-[13001] relative h-full"
        title={<p className="text-2xl">{drawerLabel}</p>}
      >
        {children}

        <div className="absolute left-0 bottom-0 w-full p-4">
          <Group position="center">
            <Button
              onClick={handleCloseDrawer}
              variant="outline"
              leftIcon={<IconArrowBackUpDouble />}
            >
              {t('settings.quit')}
            </Button>
            <Button
              leftIcon={<IconDeviceFloppy />}
              disabled={disabledSave}
              onClick={() => {
                if (save()) {
                  handleCloseDrawer();
                }
              }}
            >
              {t('settings.save')}
            </Button>
          </Group>
        </div>
      </Drawer>
    </>
  );
};

export default SettingsDrawer;
