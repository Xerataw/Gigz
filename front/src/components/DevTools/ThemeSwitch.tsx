import {
  Box,
  Center,
  ColorScheme,
  SegmentedControl,
  ThemeIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { t } from 'i18next';
import { useUser } from '../../store/UserProvider';
import { fromStringToETheme } from '../../types/ETheme';

interface IThemeSwitchProps {}

const ThemeSwitch: React.FC<IThemeSwitchProps> = ({}) => {
  const user = useUser();
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <>
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
    </>
  );
};

export default ThemeSwitch;
