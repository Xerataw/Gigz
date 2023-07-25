enum ETheme {
  DARK = 'dark',
  LIGHT = 'light',
}

export default ETheme;

export const fromStringToETheme = (theme: string) => {
  switch (theme) {
    case 'dark':
      return ETheme.DARK;
    default:
      return ETheme.LIGHT;
  }
};
