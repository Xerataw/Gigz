import { QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

// Configure react query
const queryClient: QueryClient = new QueryClient();
queryClient.defaultQueryOptions({ retry: false });
queryClient.defaultMutationOptions({ retry: false });

root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={{ loader: 'bars' }}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MantineProvider>
);
