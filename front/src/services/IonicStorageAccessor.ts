import { Storage } from '@ionic/storage';

const store = new Storage();
await store.create();

export default class IonicStorageAccessor {
  static get = async (key: string): Promise<any> => {
    return await store.get(key);
  };

  static set = async (key: string, value: string): Promise<any> => {
    return await store.set(key, value);
  };

  static remove = async (key: string): Promise<any> => {
    return await store.remove(key);
  };
}
