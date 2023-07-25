import { MantineProvider } from '@mantine/core';
import { THEME_ID, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import mantineThemeConfig from '../configs/mantineTheme.config';
import muiThemeConfig from '../configs/muiTheme.config';
import GenresProvider from './GenresProvider';
import UserProvider from './UserProvider';
import InitialLoadingProvider from './InitialLoadingProvider';

interface IAppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={mantineThemeConfig}
    >
      <ThemeProvider theme={{ [THEME_ID]: muiThemeConfig }}>
        <InitialLoadingProvider>
          <UserProvider>{children}</UserProvider>
        </InitialLoadingProvider>
      </ThemeProvider>
    </MantineProvider>
  );
};

export default AppProvider;
