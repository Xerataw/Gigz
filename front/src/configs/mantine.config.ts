import { MantineThemeOverride } from '@mantine/core';

const mantineThemeConfig: MantineThemeOverride = {
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
  primaryColor: 'secondary',
};

export default mantineThemeConfig;
