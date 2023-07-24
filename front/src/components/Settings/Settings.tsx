import { Group, ActionIcon, Drawer } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { LinkUtils } from '../../services/LinkUtils';

interface ISettingsProps {}

const Settings: React.FC<ISettingsProps> = ({}) => {
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);

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
        title="Settings"
        position="right"
        className="z-[1201] bg-red-500 relative"
      >
        {/* Drawer content */}
      </Drawer>
      <div className="absolute z-50 p-3 right-0">
        <Group>
          <ActionIcon
            size="3rem"
            variant="outline"
            radius="xl"
            className="bg-white"
            onClick={handleOpenDrawer}
          >
            <IconSettings />
          </ActionIcon>
        </Group>
      </div>
    </>
  );
};

export default Settings;
