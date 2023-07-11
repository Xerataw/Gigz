import IonicStorageAccessor from '../services/IonicStorageAccessor';
import EUserType from '../types/EUserType';

/**
 * This decorator is used to store the user in the local storage on change.
 */
const storeUser = (argument: string) => {
  return (target: any, key: string, descriptor: any) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      this[argument] = args[0];
      IonicStorageAccessor.set('user', this);
      return originalMethod.apply(target, args);
    };

    return descriptor;
  };
};

/**
 * Singleton to use throughout the front to get global data about the user.
 */
export default class User {
  private static instance: User;

  private name: string | null;
  private profilePicture: string | null;
  private token: string | null;
  private type: EUserType | null;

  private constructor(
    name?: string,
    profilePicture?: string,
    token?: string,
    type?: EUserType
  ) {
    this.name = name ?? null;
    this.profilePicture = profilePicture ?? null;
    this.token = token ?? null;
    this.type = type ?? null;
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
          localUserInfo.username,
          localUserInfo.profilePicture,
          localUserInfo.token,
          localUserInfo.type
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
   * Change the user instance user type (artist, host) and write the changes in local storage.
   * @param type the new user type (artist, host) to set.
   */
  @storeUser('type')
  public setUserType(type: EUserType | null) {
    this.type = type;
  }

  /**
   * @returns the user type stored in local storage.
   */
  public getUserType(): EUserType | null {
    return this.type;
  }
}
