import IonicStorageAccessor from '../services/IonicStorageAccessor';
import UserType from './UserType';

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

  private username: string | null;
  private profilePicture: string | null;
  private token: string | null;
  private type: UserType | null;

  private constructor(
    username?: string,
    profilePicture?: string,
    token?: string,
    type?: UserType
  ) {
    this.username = username ?? null;
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
      const localUserInfo = await IonicStorageAccessor.get('localUserInfo');
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
   * Change the user instance username and write the changes in local storage.
   * @param username the new username to set.
   */
  @storeUser('username')
  public setUsername(username: string | null) {
    this.username = username;
  }

  /**
   * @returns the username stored in local storage.
   */
  public getUsername(): string | null {
    return this.username;
  }

  /**
   * Change the user instance profile picture and write the changes in local storage.
   * @param username the new profile picture to set.
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
   * @param username the new auth token to set.
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

  /**
   * Change the user instance user type (artist, host) and write the changes in local storage.
   * @param username the new user type (artist, host) to set.
   */
  @storeUser('type')
  public setUserType(type: UserType | null) {
    this.type = type;
  }

  /**
   * @returns the user type stored in local storage.
   */
  public getUserType(): string | null {
    return this.type;
  }
}
