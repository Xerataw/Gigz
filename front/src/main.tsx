import { QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

// Configure react query
const queryClient: QueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

root.render(
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      loader: 'bars',
      colors: {
        primary: [
          '#FFD7D2',
          '#FF9185',
          '#FF5541',
          '#FF2E17',
          '#F22F1D',
          '#FF0000',
          '#F50000',
          '#D00000',
          '#B10000',
          '#960000',
        ],
        secondary: [
          '#FFF9EF',
          '#FFDE9E',
          '#FFC657',
          '#FFB11A',
          '#FF9E00',
          '#F28705',
          '#FF7800',
          '#DF6600',
          '#BE5700',
          '#A14A00',
        ],
        tertiary: [
          '#FFFDEF',
          '#FFF59E',
          '#FFEE57',
          '#FFE81A',
          '#FFE000',
          '#F2B705',
          '#FFB500',
          '#DF9C00',
          '#BE8500',
          '#A17100',
        ],
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MantineProvider>
);
