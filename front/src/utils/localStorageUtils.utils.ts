import { Storage } from '@ionic/storage';

export class LocalStorageUtils {
  static store = new Storage();

  static create = async (): Promise<Storage> => {
    return await this.store.create();
  };

  static get = async (key: string): Promise<string | object | null> => {
    return await this.store.get(key);
  };

  static set = async (key: string, value: string): Promise<string> => {
    return await this.store.set(key, value);
  };

  static remove = async (key: string): Promise<string> => {
    return await this.store.remove(key);
  };
}
