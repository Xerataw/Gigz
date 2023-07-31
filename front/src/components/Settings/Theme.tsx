import {
  Box,
  Center,
  ColorScheme,
  Divider,
  SegmentedControl,
  ThemeIcon,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { t } from 'i18next';
import { useUser } from '../../store/UserProvider';
import { fromStringToETheme } from '../../types/ETheme';

const Theme: React.FC = () => {
  const user = useUser();
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <Title order={3}>{t('settings.theme.title')}</Title>

      <SegmentedControl
        fullWidth
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <ThemeIcon
                  variant="outline"
                  className="text-yellow-500 border-none"
                >
                  <IconSunFilled size="2rem" />
                </ThemeIcon>
                <Box ml={10}>{t('settings.theme.light')}</Box>
              </Center>
            ),
          },

          {
            value: 'dark',
            label: (
              <Center>
                <ThemeIcon
                  variant="outline"
                  className="text-slate-600 border-none"
                >
                  <IconMoonFilled size="2rem" />
                </ThemeIcon>
                <Box ml={10}>{t('settings.theme.dark')}</Box>
              </Center>
            ),
          },
        ]}
        defaultValue={user.getTheme()}
        onChange={(theme) => {
          toggleColorScheme(theme as ColorScheme);
          user.setTheme(fromStringToETheme(theme));
        }}
      />
      <Divider m={15} />
    </>
  );
};

export default Theme;
