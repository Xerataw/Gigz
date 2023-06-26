import { LocalStorageUtils } from '../utils/localStorageUtils.utils';
import { UserTypes } from './UserType';

/**
 * This decorator is used to store the user in the local storage on change
 *
 * @param argument
 * @returns
 */
const storeUser = (argument: string) => {
  return (target: any, key: string, descriptor: any) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      this[argument] = args[0];
      LocalStorageUtils.set('user', this);
      return originalMethod.apply(target, args);
    };

    return descriptor;
  };
};

export interface UserInterface {
  userName: string;
  profilePicture: string;
  token: string;
  type: UserTypes;
}

export class User {
  public userName: string;
  public profilePicture: string;
  public token: string;
  public type: UserTypes;

  constructor(
    userName: string,
    profilePicture: string,
    token: string,
    type: UserTypes
  ) {
    this.userName = userName;
    this.profilePicture = profilePicture;
    this.token = token;
    this.type = type;
  }

  static fromJson(json: UserInterface): User {
    return new User(json.userName, json.profilePicture, json.token, json.type);
  }

  toJSON(user: User): UserInterface {
    return {
      userName: user.userName,
      profilePicture: user.profilePicture,
      token: user.token,
      type: user.type,
    };
  }

  @storeUser('userName')
  setUsername(userName: string) {
    this.userName = userName;
  }

  @storeUser('profilePicture')
  setProfilePicture(profilePicture: string) {
    this.profilePicture = profilePicture;
  }

  @storeUser('token')
  setToken(token: string) {
    this.token = token;
  }

  @storeUser('type')
  setType(type: UserTypes) {
    this.type = type;
  }
}
