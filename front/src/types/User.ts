import IonicStorageAccessor from '../services/IonicStorageAccessor';
import ELanguage from './ELanguage';
import EProfileType from './EProfileType';
import ETheme from './ETheme';
import { storeUser } from './utils/storeUser';

/**
 * Singleton to use throughout the front to get global data about the user.
 */
export default class User {
  private static instance: User;

  private name: string | null;
  private profilePicture: string | null;
  private token: string | null;
  private profileType: EProfileType | null;
  private userId: string | null;

  // Settings
  private language: ELanguage;
  private theme: ETheme;
  private invisibleMode: boolean;

  private constructor(
    name?: string,
    profilePicture?: string,
    token?: string,
    profileType?: EProfileType,
    userId?: string,

    language?: ELanguage,
    theme?: ETheme,
    invisibleMode?: boolean
  ) {
    this.name = name ?? null;
    this.profilePicture = profilePicture ?? null;
    this.token = token ?? null;
    this.profileType = profileType ?? null;
    this.userId = userId ?? null;

    // Settings
    this.language = language ?? ELanguage.FR;
    this.theme = theme ?? ETheme.LIGHT;
    this.invisibleMode = invisibleMode ?? false;
  }

  /**
   * If no instance, load possible information from local storage into instance memory.
   * @returns the unique user instance of the app.
   */
  public static async getInstance(): Promise<User> {
    if (!this.instance) {
      const localUserInfo = await IonicStorageAccessor.get('user');
      if (!localUserInfo) this.instance = new User();
      else
        this.instance = new User(
          localUserInfo.name,
          localUserInfo.profilePicture,
          localUserInfo.token,
          localUserInfo.profileType,
          localUserInfo.userId,
          localUserInfo.language,
          localUserInfo.theme,
          localUserInfo.invisibleMode
        );
    }
    return this.instance;
  }

  /**
   * Change the user instance name and write the changes in local storage.
   * @param name the new user name to set.
   */
  @storeUser('name')
  public setName(name: string) {
    this.name = name;
  }

  /**
   * @returns the user name stored in local storage.
   */
  public getName(): string | null {
    return this.name;
  }

  /**
   * Change the user instance profile picture and write the changes in local storage.
   * @param profilePicture the new profile picture to set.
   */
  @storeUser('profilePicture')
  public setProfilePicture(profilePicture: string | null) {
    this.profilePicture = profilePicture;
  }

  /**
   * @returns the profile picture stored in local storage.
   */
  public getProfilePicture(): string | null {
    return this.profilePicture;
  }

  /**
   * Change the user instance auth token and write the changes in local storage.
   * @param token the new auth token to set.
   */
  @storeUser('token')
  public setToken(token: string | null) {
    this.token = token;
  }

  /**
   * @returns the auth token stored in local storage.
   */
  public getToken(): string | null {
    return this.token;
  }

  static async getToken(): Promise<string> {
    return await IonicStorageAccessor.get('token');
  }

  /**
   * Change the user instance profile type (artist, host) and write the changes in local storage.
   * @param profileType the new profile type (artist, host) to set.
   */
  @storeUser('profileType')
  public setProfileType(profileType: EProfileType | null) {
    this.profileType = profileType;
  }

  /**
   * @returns the user profile type stored in local storage.
   */
  public getProfileType(): EProfileType | null {
    return this.profileType;
  }

  /**
   * Change the user id and write the changes in local storage.
   * @param userId the new user id to set.
   */
  @storeUser('userId')
  public setUserId(userId: string | null) {
    this.userId = userId;
  }

  /**
   * @returns the user id stored in local storage.
   */
  public getUserId(): string | null {
    return this.userId;
  }

  // Settings

  // LANGUAGE
  @storeUser('language')
  public setLanguage(language: ELanguage) {
    this.language = language;
  }

  public getLanguage(): ELanguage {
    return this.language;
  }

  // THEME
  @storeUser('theme')
  public setTheme(theme: ETheme) {
    this.theme = theme;
  }

  public getTheme(): ETheme {
    return this.theme;
  }

  // INVISIBLE MODE
  @storeUser('invisibleMode')
  public setInvisibleMode(invisibleMode: boolean) {
    this.invisibleMode = invisibleMode;
  }

  public getInvisibleMode(): boolean {
    return this.invisibleMode;
  }
}
