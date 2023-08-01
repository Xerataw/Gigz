import { Button } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import IonicStorageAccessor from '../../services/IonicStorageAccessor';

const Logout: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Button
      leftIcon={<IconLogout2 />}
      onClick={() => {
        IonicStorageAccessor.remove('user').then(() => {
          history.push('/login');
        });
      }}
    >
      {t('settings.logout')}
    </Button>
  );
};

export default Logout;
