import { QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import mantineThemeConfig from './configs/mantine.config.js';
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
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MantineProvider>
);
