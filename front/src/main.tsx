import { QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import mantineThemeConfig from './configs/mantineTheme.config';
import { ThemeProvider, THEME_ID } from '@mui/material/styles';
import muiThemeConfig from './configs/muiTheme.config';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n.js';

// Create react root
const container = document.getElementById('root');
const root = createRoot(container!);

// Configure react query
const queryClient: QueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineThemeConfig}>
    <ThemeProvider theme={{ [THEME_ID]: muiThemeConfig }}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </MantineProvider>
);
