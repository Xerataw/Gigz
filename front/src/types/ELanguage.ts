enum ELanguage {
  FR = 'fr',
  EN = 'en',
}

export default ELanguage;

export const fromStringToELanguage = (language: string) => {
  switch (language) {
    case 'en':
      return ELanguage.EN;
    default:
      return ELanguage.FR;
  }
};
