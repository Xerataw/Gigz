import { Storage } from '@ionic/storage';

/**
 * Static class allowing us to manipulate the Ionic Storage.
 */
export default class IonicStorageAccessor {
  static store = new Storage();

  static get = async (key: string): Promise<any> => {
    return await this.callStorage(() => this.store.get(key));
  };

  static set = async (key: string, value: string): Promise<any> => {
    return await this.callStorage(() => this.store.set(key, value));
  };

  static remove = async (key: string): Promise<any> => {
    return await this.callStorage(() => this.store.remove(key));
  };

  private static callStorage = async (
    callback: () => Promise<any>
  ): Promise<any> => {
    try {
      return await callback();
    } catch (error) {
      return await this.store.create().then(async () => {
        return await callback();
      });
    }
  };
}
