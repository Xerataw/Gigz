import { Drawer, Group } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { LinkUtils } from '../../services/LinkUtils';
import LightRoundButton from '../LightRoundButton';

const Settings: React.FC = () => {
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
          <LightRoundButton onClick={handleOpenDrawer}>
            <IconSettings className="mr-[0.09rem] mt-[0.05rem]" />
          </LightRoundButton>
        </Group>
      </div>
    </>
  );
};

export default Settings;
