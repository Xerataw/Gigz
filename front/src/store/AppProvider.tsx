import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { THEME_ID, ThemeProvider } from '@mui/material';
import { ReactNode, useState } from 'react';
import mantineThemeConfig from '../configs/mantineTheme.config';
import muiThemeConfig from '../configs/muiTheme.config';
import InitialLoadingProvider from './InitialLoadingProvider';
import UserProvider from './UserProvider';

interface IAppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...mantineThemeConfig, colorScheme }}
      >
        <ThemeProvider theme={{ [THEME_ID]: muiThemeConfig }}>
          <InitialLoadingProvider>
            <UserProvider>{children}</UserProvider>
          </InitialLoadingProvider>
        </ThemeProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default AppProvider;
