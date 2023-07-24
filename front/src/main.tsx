import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n';
import AppProvider from './store/AppProvider';

// Create react root
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
