import { ActionIcon, Group, Menu } from '@mantine/core';
import {
  IconAbc,
  IconAt,
  IconBug,
  IconCircleKey,
  IconEye,
  IconEyeClosed,
  IconLogout,
  IconPhone,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { DevToolsLogic } from '../../services/DevToolsLogic';
import IonicStorageAccessor from '../../services/IonicStorageAccessor';
import LanguageSwitch from './LanguageSwitch';
import ThemeSwitch from './ThemeSwitch';

const boolToStr = (bool: boolean) => {
  return bool ? '1' : '0';
};

const strToBool = (str: string) => {
  return str === '1' ? true : false;
};

const DevTools: React.FC = () => {
  const [alwaysOpen, setAlwaysOpen] = useState<boolean>(
    strToBool(localStorage.getItem('devtools') ?? '')
  );
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('devtools', boolToStr(alwaysOpen));
  }, [alwaysOpen]);

  return (
    <div className="absolute top-2 left-2">
      <Menu shadow="md" opened={alwaysOpen || open} onChange={setOpen}>
        <Menu.Target>
          <ActionIcon variant="filled" color="primary">
            <IconBug />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Always displayed</Menu.Label>
          <Menu.Item
            onClick={() => {
              setAlwaysOpen((old) => !old);
            }}
          >
            {alwaysOpen ? (
              <>
                <IconEye /> on
              </>
            ) : (
              <>
                <IconEyeClosed /> off
              </>
            )}
          </Menu.Item>
          <Menu.Label>Values</Menu.Label>
          <Group>
            <ActionIcon
              color="dark"
              onClick={() => {
                navigator.clipboard.writeText(DevToolsLogic.getRandomEmail());
              }}
            >
              <IconAt />
            </ActionIcon>
            <ActionIcon
              color="dark"
              onClick={() => {
                navigator.clipboard.writeText(DevToolsLogic.getRandomPhone());
              }}
            >
              <IconPhone />
            </ActionIcon>
            <ActionIcon
              color="dark"
              onClick={() => {
                navigator.clipboard.writeText(
                  DevToolsLogic.getRandomPassword()
                );
              }}
            >
              <IconCircleKey />
            </ActionIcon>
            <ActionIcon
              color="dark"
              onClick={() => {
                navigator.clipboard.writeText(DevToolsLogic.getRandomString());
              }}
            >
              <IconAbc />
            </ActionIcon>
          </Group>
          <Menu.Divider />
          <Group>
            <LanguageSwitch />
            <ThemeSwitch />
          </Group>
          <Menu.Divider />
          <ActionIcon
            color="dark"
            onClick={() => {
              IonicStorageAccessor.remove('user').then(
                () => (window.location.href = '/')
              );
            }}
          >
            <IconLogout />
          </ActionIcon>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default DevTools;
