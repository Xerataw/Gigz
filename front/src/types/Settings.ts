import ELanguage from './ELanguage';
import { storeUser } from './utils/storeUser';

export class LanguageSettings {
  private language: ELanguage;

  public constructor(language?: ELanguage) {
    this.language = language ?? ELanguage.FR;
  }

  @storeUser('language')
  public setLanguage(language: ELanguage) {
    this.language = language;
  }

  public getLanguage(): ELanguage {
    return this.language;
  }
}
