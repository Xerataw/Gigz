import {
  Box,
  Center,
  Divider,
  SegmentedControl,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../store/UserProvider';

const stringToBoolean = (value: string) => value === 'true';

const InsivibleMode: React.FC = () => {
  const user = useUser();
  const { t } = useTranslation();

  return (
    <>
      <Title order={3}>{t('settings.invisible.title')}</Title>

      <SegmentedControl
        fullWidth
        data={[
          {
            value: 'false',
            label: (
              <Center>
                <ThemeIcon
                  variant="outline"
                  className="text-slate-600 border-none"
                >
                  <IconEye size="2rem" />
                </ThemeIcon>
                <Box ml={10}>{t('settings.invisible.off')}</Box>
              </Center>
            ),
          },
          {
            value: 'true',
            label: (
              <Center>
                <ThemeIcon
                  variant="outline"
                  className="text-slate-600 border-none"
                >
                  <IconEyeOff size="2rem" />
                </ThemeIcon>
                <Box ml={10}> {t('settings.invisible.on')}</Box>
              </Center>
            ),
          },
        ]}
        defaultValue={user.getInvisibleMode().toString()}
        onChange={(mode) => {
          user.setInvisibleMode(stringToBoolean(mode));
        }}
      />
      <Divider m={15} />
    </>
  );
};

export default InsivibleMode;
