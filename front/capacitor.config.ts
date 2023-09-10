import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gigz.gigz',
  appName: 'Gigz',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
